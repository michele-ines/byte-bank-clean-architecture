import { ToastType } from "@/src/types/types";
import Toast from "react-native-toast-message";

export const showToast = (type: ToastType, title: string, message: string) => {
  Toast.show({ type, text1: title, text2: message });
};
