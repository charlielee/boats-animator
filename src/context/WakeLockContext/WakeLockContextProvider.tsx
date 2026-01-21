import { ReactNode, useRef, useEffect } from "react";
import * as rLogger from "../../services/rLogger/rLogger";

import { WakeLockContext } from "./WakeLockContext";

interface WakeLockContextProviderProps {
  children: ReactNode;
}

export const WakeLockContextProvider = ({ children }: WakeLockContextProviderProps) => {
  const wakeLockSentinelRef = useRef<WakeLockSentinel | null>(null);

  const refreshWakeLock = async () => {
    console.log("I am grabbing the wakelock!");
    try {
        if (!wakeLockSentinelRef.current || wakeLockSentinelRef.current.released){
            wakeLockSentinelRef.current = await navigator.wakeLock.request();
        }
    } catch (e) {
        rLogger.warn("Failed to request wake lock:", `${e}`);
    }
  };

  const releaseWakeLock = async () => {
    try {
        if (wakeLockSentinelRef.current) {
            await wakeLockSentinelRef.current.release();
        }
    } catch (e) {
        rLogger.warn("Failed to release wake lock:", `${e}`);
    }
  };

  return (
    <WakeLockContext.Provider
      value={{
        refreshWakeLock,
        releaseWakeLock,
      }}
    >
      {children}
    </WakeLockContext.Provider>
  );
};

