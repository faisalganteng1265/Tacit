"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ToastVariant = "info" | "success" | "error";

type Toast = {
  id: number;
  title: string;
  description?: string;
  txHash?: string;
  variant: ToastVariant;
};

type ToastInput = {
  title: string;
  description?: string;
  txHash?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastContextValue = {
  addToast: (toast: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantClasses: Record<ToastVariant, string> = {
  info: "border-sky-400/35 bg-[#071013] text-sky-200",
  success: "border-[#2dd4bf]/40 bg-[#061312] text-[#c6fffa]",
  error: "border-red-400/40 bg-[#160809] text-red-100",
};

const dotClasses: Record<ToastVariant, string> = {
  info: "bg-sky-300",
  success: "bg-[#2dd4bf]",
  error: "bg-red-400",
};

function shortHash(hash?: string) {
  if (!hash) return undefined;
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message.split("\n")[0];
  return "Transaction could not be completed.";
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((items) => items.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: ToastInput) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const duration = toast.duration ?? 5_500;

    setToasts((items) => [
      ...items,
      {
        id,
        title: toast.title,
        description: toast.description,
        txHash: toast.txHash,
        variant: toast.variant ?? "info",
      },
    ]);

    window.setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(340px,calc(100vw-2rem))] flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-md border px-3 py-2.5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur ${variantClasses[toast.variant]}`}
          >
            <div className="flex items-start gap-2">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClasses[toast.variant]}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold tracking-[0.04em]">{toast.title}</p>
                {(toast.description || toast.txHash) && (
                  <p className="mt-1 truncate text-[10px] leading-[1.45] text-[#8b95a3]">
                    {toast.description}
                    {toast.txHash ? ` ${shortHash(toast.txHash)}` : ""}
                  </p>
                )}
              </div>
              <button className="shrink-0 text-[12px] leading-none text-[#6b7280]" onClick={() => removeToast(toast.id)} type="button">
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context.addToast;
}

export function useTxToast() {
  const addToast = useToast();

  return useCallback(
    async <T,>(label: string, action: () => Promise<T>) => {
      addToast({
        title: `${label} requested`,
        description: "Confirm the transaction in your wallet.",
        variant: "info",
        duration: 3_000,
      });

      try {
        const result = await action();
        const txHash = typeof result === "string" && result.length > 0 ? result : undefined;

        addToast({
          title: `${label} submitted`,
          description: txHash ? "Tx hash" : "Request completed.",
          txHash,
          variant: "success",
          duration: 6_500,
        });

        return result;
      } catch (error) {
        addToast({
          title: `${label} failed`,
          description: getErrorMessage(error),
          variant: "error",
          duration: 7_000,
        });
        throw error;
      }
    },
    [addToast],
  );
}
