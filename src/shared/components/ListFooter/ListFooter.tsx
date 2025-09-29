import { typography } from '@/src/theme';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './ListFooter.styles';
import { footerTexts } from './ListFooter.texts';

type ListFooterProps = {
  isLoadingMore: boolean;
};

export const ListFooter: React.FC<ListFooterProps> = ({ isLoadingMore }) => {
  if (!isLoadingMore) return null;

  return (
    <View style={styles.loadingFooter} accessibilityLiveRegion={typography.liveRegionPolite}>
      <Text style={styles.loadingText}>{footerTexts.loading}</Text>
    </View>
  );
};