
import PersonalCards from "@presentation/components/cards/cards/PersonalCards/PersonalCards";
import { ScreenWrapper } from "@presentation/components/common/common/ScreenWrapper/ScreenWrapper";
import { texts } from "@presentation/theme";
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
            {texts.textMeusCartoes}
          </Text>
          <Text style={styles.subtitle}>{texts.textConfigCardsSubtitle}</Text>
        </View>

        <PersonalCards />
      </View>
    </ScreenWrapper>

  );
};

export default CardsScreen;
