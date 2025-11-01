/* eslint-disable @typescript-eslint/consistent-type-imports */
import { DI } from "@/shared/ProfileStyles/profile.styles.types";
import React, { createContext, useContext, useMemo } from "react";

const DIContext = createContext<DI | null>(null);

export const DIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo<DI>(() => {
    // use-cases refatorados — fornecemos stubs compatíveis para evitar que o provider quebre
    return {
      createTransaction: {
        exec: (_tx: unknown) => {
          // noop stub
          return Promise.resolve();
        },
      },
      listUserTransactions: {
        exec: (_userId: string) => {
          // noop stub: returns unsubscribe
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
