import { UseBalanceVisibilityProps, UseBalanceVisibilityReturn } from '@shared/interfaces/auth.interfaces';
import { formatBRL } from '@shared/utils/currency-formatte';
import { useMemo, useState } from 'react';
import { texts } from '../theme';

/**
 * Hook customizado para gerenciar a visibilidade e formatação do saldo
 * @param balance - Valor do saldo (number | null)
 * @returns Objeto com estado, funções e valores formatados
 */
export function useBalanceVisibility({ balance }: UseBalanceVisibilityProps): UseBalanceVisibilityReturn {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  const toggleBalance = () => setShowBalance(prev => !prev);

  const displayValue = useMemo(() => {
    if (!showBalance) return texts.hiddenBalanceMask;
    if (typeof balance === "number") return formatBRL(balance);
    return texts.loadingText;
  }, [showBalance, balance]);

  const accessibilityLabel = useMemo(() => {
    if (!showBalance) return "Saldo oculto. Toque no ícone do olho para mostrar";
    if (typeof balance === "number") return `Saldo atual: ${formatBRL(balance)}`;
    return "Carregando saldo da conta";
  }, [showBalance, balance]);

  const accessibilityHint = showBalance 
    ? "Toque para ocultar o valor do saldo" 
    : "Toque para mostrar o valor do saldo";

  const buttonAccessibilityLabel = showBalance 
    ? "Ocultar saldo da conta" 
    : "Mostrar saldo da conta";

  return {
    showBalance,
    toggleBalance,
    displayValue,
    accessibilityLabel,
    accessibilityHint,
    buttonAccessibilityLabel,
  };
}
