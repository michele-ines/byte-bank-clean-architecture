// src/components/layouts/ScreenWrapper.styles.ts
import { tokens } from '@/src/theme/tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: tokens.spacingMd, 
    backgroundColor: tokens.byteBgDashboard, 
    gap: tokens.spacingMd
  },
  header: {
    marginBottom: tokens.spacingMd,
  },
  footer: {
    marginTop: tokens.spacingMd,
  },
});
