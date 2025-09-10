import PersonalCards from "@/src/components/cards/PersonalCards/PersonalCards";
import { ScreenWrapper } from "@/src/components/common/ScreenWrapper/ScreenWrapper";
import { tokens } from "@/src/theme/tokens";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./MyCardsScreen.styles";

const CardsScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <View
        style={styles.container}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.title} accessibilityRole="header">
            {tokens.textMeusCartoes}
          </Text>
          <Text style={styles.subtitle}>{tokens.textConfigCardsSubtitle}</Text>
        </View>

        <PersonalCards />
      </View>
    </ScreenWrapper>

  );
};

export default CardsScreen;
