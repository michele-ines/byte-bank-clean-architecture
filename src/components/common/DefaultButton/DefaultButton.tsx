import { colors, layout } from "@/src/theme";
import React from "react";
import {
  AccessibilityRole,
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface DefaultButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  indicatorColor?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel: string;
  accessibilityHint?: string;
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  title,
  loading = false,
  disabled = false,
  onPress,
  buttonStyle,
  textStyle,
  indicatorColor = colors.byteColorWhite,
  accessibilityRole = "button",
  accessibilityLabel,
  accessibilityHint,
}) => {
  return (
    <TouchableOpacity
      style={[buttonStyle, disabled && { opacity: layout.opacityMd }]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={layout.opacityPressed}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
