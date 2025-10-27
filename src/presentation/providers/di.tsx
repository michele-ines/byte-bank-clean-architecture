/* eslint-disable @typescript-eslint/consistent-type-imports */
import { DI } from "@/shared/ProfileStyles/profile.styles.types";
import { CreateTransaction } from "@application/use-cases/CreateTransaction";
import { ListUserTransactions } from "@application/use-cases/ListUserTransactions";
import { FirebaseTransactionsRepository } from "@infrastructure/persistence/FirebaseTransactionsRepository";
import React, { createContext, useContext, useMemo } from "react";

const DIContext = createContext<DI | null>(null);

export const DIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useMemo<DI>(() => {
    const repo = new FirebaseTransactionsRepository();
    return {
      createTransaction: new CreateTransaction(repo),
      listUserTransactions: new ListUserTransactions(repo),
    };
  }, []);

  return <DIContext.Provider value={value}>{children}</DIContext.Provider>;
};

export const useDI = (): DI => {
  const ctx = useContext(DIContext);
  if (!ctx) throw new Error("useDI deve ser usado dentro de DIProvider");
  return ctx;
};
