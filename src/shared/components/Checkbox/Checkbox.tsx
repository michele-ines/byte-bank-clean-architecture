import { colors } from '@/src/theme/colors';
import ExpoCheckbox from 'expo-checkbox';
import React from 'react';
import { CheckboxProps } from '../../interfaces/auth.interfaces';

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
