import{ createContext, useContext } from "react";

interface WakeLockContextProps {
  refreshWakeLock: () => Promise<void>;
  releaseWakeLock: () => Promise<void>;
}

export const WakeLockContext = createContext<WakeLockContextProps | undefined>(undefined);

export const useWakeLockContext = () => {
  const context = useContext(WakeLockContext);

  if (context === undefined) {
    throw new Error("Must be called within WakeLockContextProvider");
  }

  return context;
};

