import { colors } from '@/src/theme/colors';
import ExpoCheckbox from 'expo-checkbox';
import React from 'react';
import { ViewStyle } from 'react-native';

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
  color?: string;
  // Parâmetros opcionais de acessibilidade
  accessibilityLabel?: string;
  accessibilityRole?: 'checkbox' | 'button' | 'switch';
  accessibilityHint?: string;
  accessibilityState?: {
    checked?: boolean;
    disabled?: boolean;
  };
}

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onValueChange,
  style,
  color,
  accessibilityLabel,
  accessibilityRole = 'checkbox',
  accessibilityHint,
  accessibilityState,
}) => {
  return (
    <ExpoCheckbox
      style={style}
      value={value}
      onValueChange={onValueChange}
      color={color || (value ? colors.byteColorGreen500 : undefined)}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityState || { checked: value }}
    />
  );
};
