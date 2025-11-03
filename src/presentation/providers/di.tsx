/* eslint-disable @typescript-eslint/consistent-type-imports */
import { DI } from "@/shared/ProfileStyles/profile.styles.types";
import React, { createContext, useContext, useMemo } from "react";

const DIContext = createContext<DI | null>(null);

export const DIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo<DI>(() => {
    return {
      createTransaction: {
        exec: (_tx: unknown) => {
          return Promise.resolve();
        },
      },
      listUserTransactions: {
        exec: (_userId: string) => {
          return () => undefined;
        },
      },
    };
  }, []);

  return <DIContext.Provider value={value}>{children}</DIContext.Provider>;
};

export const useDI = (): DI => {
  const ctx = useContext(DIContext);
  if (!ctx) throw new Error("useDI deve ser usado dentro de DIProvider");
  return ctx;
};
