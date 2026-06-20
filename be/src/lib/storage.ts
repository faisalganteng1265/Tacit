import { SealClient, SessionKey } from "@mysten/seal";
import { Transaction } from "@mysten/sui/transactions";
import { fromHex, toHex } from "@mysten/sui/utils";
import { WalrusClient } from "@mysten/walrus";
import { CONFIG_ID, getClient, getOracleKeypair, PACKAGE_ID } from "./sui.js";

const WALRUS_EPOCHS = Number(process.env.WALRUS_EPOCHS ?? "5");
const SEAL_THRESHOLD = Number(process.env.SEAL_THRESHOLD ?? "1");
const SEAL_KEY_SERVER_IDS = (process.env.SEAL_KEY_SERVER_IDS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

let sealClient: SealClient | null = null;
function getSealClient(): SealClient {
  if (!sealClient) {
    sealClient = new SealClient({
      suiClient: getClient(),
      serverConfigs: SEAL_KEY_SERVER_IDS.map((objectId) => ({ objectId, weight: 1 })),
      verifyKeyServers: false,
    });
  }
  return sealClient;
}

let walrusClient: WalrusClient | null = null;
function getWalrusClient(): WalrusClient {
  if (!walrusClient) {
    const network = (process.env.SUI_NETWORK ?? "testnet") as "testnet" | "mainnet";
    // Direct sliver writes from a single residential/dev connection to all
    // storage nodes are unreliable (NotEnoughBlobConfirmationsError) — route
    // through Mysten's public upload relay instead, same as `walrus` CLI.
    const uploadRelayHost =
      network === "testnet" ? "https://upload-relay.testnet.walrus.space" : undefined;
    walrusClient = new WalrusClient({
      network,
      suiClient: getClient(),
      uploadRelay: uploadRelayHost ? { host: uploadRelayHost, sendTip: { max: 5_000_000 } } : undefined,
    });
  }
  return walrusClient;
}

// Storing a blob costs WAL, not SUI — verified live against testnet on
// 2026-06-21 (package/object ids below are Mysten's official testnet WAL
// exchange, same one the `walrus` CLI's `get-wal` command swaps through).
// There's no public 1:1 exchange on mainnet, so this only runs on testnet.
const WAL_COIN_TYPE = "0x8270feb7375eee355e64fdb69c50abb6b5f9393a722883c1cf45f8e26048810a::wal::WAL";
const WAL_EXCHANGE_PACKAGE_ID = "0x82593828ed3fcb8c6a235eac9abd0adbe9c5f9bbffa9b1e7a45cdd884481ef9f";
const WAL_EXCHANGE_OBJECT_ID = "0xf4d164ea2def5fe07dc573992a029e010dba09b1a8dcbc44c5c2e79567f39073";
const WAL_TOPUP_THRESHOLD_MIST = 10_000_000n; // 0.01 WAL
const WAL_TOPUP_SWAP_SUI_MIST = 50_000_000n; // 0.05 SUI -> 0.05 WAL at the exchange's 1:1 rate

async function ensureWalBalance(): Promise<void> {
  if ((process.env.SUI_NETWORK ?? "testnet") !== "testnet") return;

  const keypair = getOracleKeypair();
  const address = keypair.toSuiAddress();
  const { totalBalance } = await getClient().getBalance({ owner: address, coinType: WAL_COIN_TYPE });
  if (BigInt(totalBalance) >= WAL_TOPUP_THRESHOLD_MIST) return;

  console.log(`[storage] WAL balance low (${totalBalance} MIST) — topping up via testnet exchange...`);
  const tx = new Transaction();
  const [suiForWal] = tx.splitCoins(tx.gas, [WAL_TOPUP_SWAP_SUI_MIST]);
  const walCoin = tx.moveCall({
    target: `${WAL_EXCHANGE_PACKAGE_ID}::wal_exchange::exchange_all_for_wal`,
    arguments: [tx.object(WAL_EXCHANGE_OBJECT_ID), suiForWal],
  });
  tx.transferObjects([walCoin], address);

  const result = await getClient().signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: { showEffects: true },
  });
  if (result.effects?.status.status !== "success") {
    throw new Error(`WAL top-up failed: ${result.effects?.status.error}`);
  }
  console.log(`[storage] WAL top-up tx: ${result.digest}`);
}

// Seal identity is namespaced to the mentor's `MentorState` object id, so
// each mentor's knowledge has an independent on-chain access policy (see
// sc/sources/seal_policy.move's `seal_approve`) instead of a shared AES key.
function sealIdForState(stateId: string): Uint8Array {
  return fromHex(stateId.startsWith("0x") ? stateId.slice(2) : stateId);
}

// Encrypts via Seal (decryption gated by the mentor's on-chain share/oracle/
// allow-list policy, not by a key the backend hands out) then stores the
// ciphertext on Walrus. Returns the blob id anchored on-chain via
// `oracleUpdateBlobId`.
export async function uploadKnowledge(
  stateId: string,
  content: string
): Promise<{ blobId: string; sizeBytes: number }> {
  const plaintext = new TextEncoder().encode(content);
  const { encryptedObject } = await getSealClient().encrypt({
    threshold: SEAL_THRESHOLD,
    packageId: PACKAGE_ID,
    id: toHex(sealIdForState(stateId)),
    data: plaintext,
  });

  await ensureWalBalance();
  const { blobId } = await getWalrusClient().writeBlob({
    blob: encryptedObject,
    deletable: true,
    epochs: WALRUS_EPOCHS,
    signer: getOracleKeypair(),
  });

  return { blobId, sizeBytes: encryptedObject.length };
}

// Downloads the ciphertext from Walrus and asks Seal's key-servers to
// decrypt it under the backend's own oracle session — approved via the
// oracle-bypass branch of `seal_approve` (see sc/sources/seal_policy.move).
export async function downloadKnowledge(
  stateId: string,
  sharePoolId: string,
  blobId: string
): Promise<string> {
  const ciphertext = await getWalrusClient().readBlob({ blobId });

  const sessionKey = await SessionKey.create({
    address: getOracleKeypair().toSuiAddress(),
    packageId: PACKAGE_ID,
    ttlMin: 10,
    suiClient: getClient(),
  });
  const { signature } = await getOracleKeypair().signPersonalMessage(sessionKey.getPersonalMessage());
  sessionKey.setPersonalMessageSignature(signature);

  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::seal_policy::seal_approve`,
    arguments: [
      tx.pure.vector("u8", Array.from(sealIdForState(stateId))),
      tx.object(stateId),
      tx.object(sharePoolId),
      tx.object(CONFIG_ID),
    ],
  });
  const txBytes = await tx.build({ client: getClient(), onlyTransactionKind: true });

  const plaintext = await getSealClient().decrypt({ data: ciphertext, sessionKey, txBytes });
  return new TextDecoder().decode(plaintext);
}
