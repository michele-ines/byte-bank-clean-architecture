import type { ToastType } from "@shared/ProfileStyles/profile.styles.types";
import Toast from "react-native-toast-message";

export const formatTransactionDescription = (type: string, value: number): string => {
  const formattedValue = value.toFixed(2).replace(".", ",");
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  return `${capitalizedType} - R$ ${formattedValue}`;
};

export const showToast = (type: ToastType, text1: string, text2: string): void => {
  Toast.show({ type, text1, text2 });
};
