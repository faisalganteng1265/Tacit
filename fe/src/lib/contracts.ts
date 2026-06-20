export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID ?? "";
export const CONFIG_ID = process.env.NEXT_PUBLIC_CONFIG_ID ?? "";

export const MENTOR_NFT_MODULE = `${PACKAGE_ID}::mentor_nft`;
export const MARKETPLACE_MODULE = `${PACKAGE_ID}::marketplace`;
export const SHARES_MARKET_MODULE = `${PACKAGE_ID}::shares_market`;
export const REVENUE_MODULE = `${PACKAGE_ID}::revenue`;
export const VESTING_MODULE = `${PACKAGE_ID}::vesting`;

export const MOVE_EVENT_TYPES = {
  GapChanged: `${MENTOR_NFT_MODULE}::GapChanged`,
  StorageUpdated: `${MENTOR_NFT_MODULE}::StorageUpdated`,
  StatusChanged: `${MENTOR_NFT_MODULE}::StatusChanged`,
  ConfidenceUpdated: `${MENTOR_NFT_MODULE}::ConfidenceUpdated`,
  MentorCloned: `${MENTOR_NFT_MODULE}::MentorCloned`,
  MentorRegistered: `${MARKETPLACE_MODULE}::MentorRegistered`,
  QueryExecuted: `${MARKETPLACE_MODULE}::QueryExecuted`,
  SharesBought: `${SHARES_MARKET_MODULE}::SharesBought`,
  SharesSold: `${SHARES_MARKET_MODULE}::SharesSold`,
  RevenueReceived: `${REVENUE_MODULE}::RevenueReceived`,
  MentorRoyaltyClaimed: `${REVENUE_MODULE}::MentorRoyaltyClaimed`,
  CuratorRewardClaimed: `${REVENUE_MODULE}::CuratorRewardClaimed`,
  VestingAdded: `${VESTING_MODULE}::VestingAdded`,
  VestingClaimed: `${VESTING_MODULE}::VestingClaimed`,
  Clawback: `${VESTING_MODULE}::Clawback`,
} as const;
