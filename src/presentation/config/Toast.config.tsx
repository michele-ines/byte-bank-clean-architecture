import { toastStyles } from "@presentation/styles/Toast.styles";
import { View, ViewStyle } from "react-native";
import { BaseToast, BaseToastProps } from "react-native-toast-message";

const getAccessibilityLabel = (props: BaseToastProps) => {
  const { text1, text2 } = props;
  return [text1, text2].filter(Boolean).join(". ");
};

type ToastVariant = "success" | "error";

const ToastVariants: Record<
  ToastVariant,
  { style: ViewStyle; accessibilityPrefix: string }
> = {
  success: {
    style: toastStyles.successToast,
    accessibilityPrefix: "Sucesso",
  },
  error: {
    style: toastStyles.errorToast,
    accessibilityPrefix: "Erro",
  },
};

const CustomToast = ({
  variant,
  ...props
}: BaseToastProps & { variant: ToastVariant }) => {
  const variantConfig = ToastVariants[variant];
  return (
    <View
      accessible={true}
      accessibilityLabel={`${
        variantConfig.accessibilityPrefix
      }: ${getAccessibilityLabel(props)}`}
      accessibilityRole="alert"
    >
      <BaseToast
        {...props}
        text2NumberOfLines={3}
        style={[toastStyles.baseToast, variantConfig.style]}
        text1Style={toastStyles.text1}
        text2Style={toastStyles.text2}
      />
    </View>
  );
};

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <CustomToast {...props} variant="success" />
  ),
  error: (props: BaseToastProps) => <CustomToast {...props} variant="error" />,
};
