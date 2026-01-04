import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./LoadingFallback.styles";

const LoadingFallback: React.FC = () => {
  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityLabel="Carregando"
      accessibilityLiveRegion="polite"
    >
      <ActivityIndicator
        size="large"
        color={styles.loadingIcon.color}
        accessibilityElementsHidden={false}
      />
    </View>
  );
};

export default LoadingFallback;
