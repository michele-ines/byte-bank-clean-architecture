import { DefaultButtonProps } from "@/src/shared/interfaces/auth.interfaces";
import { colors, layout } from "@/src/theme";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";


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
