import type { UseTransactionsQueryProps } from "@/domain/entities/AuthCredentials";
import type { ITransaction } from "@domain/entities/Transaction";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function useTransactionsQuery({
  userId,
  repository,
  enabled = true,
}: UseTransactionsQueryProps): ReturnType<typeof useQuery<ITransaction[]>> {
  const unsubscribeRef = useRef<() => void>(undefined);

  const query = useQuery<ITransaction[]>({
    queryKey: ["transactions", userId],
    queryFn: () =>
      new Promise<ITransaction[]>((resolve) => {
        unsubscribeRef.current = repository.observeTransactions(
          userId,
          (transactions) => {
            resolve(transactions);
          }
        );
      }),
    enabled: !!userId && userId !== "" && enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  return query;
}