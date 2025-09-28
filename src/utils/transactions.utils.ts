import Toast from "react-native-toast-message";
import { ToastType } from "../shared/ProfileStyles/profile.styles.types";

/**
 * Formata a descrição de uma transação exibindo tipo e valor.
 */
export const formatTransactionDescription = (type: string, value: number): string => {
  const formattedValue = value.toFixed(2).replace(".", ",");
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  return `${capitalizedType} - R$ ${formattedValue}`;
};

/**
 * Mostra um toast usando react-native-toast-message.
 */
export const showToast = (type: ToastType, text1: string, text2: string) => {
  Toast.show({ type, text1, text2 });
};

