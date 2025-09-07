import PersonalCards from "@/src/components/cards/PersonalCards/PersonalCards";
import { tokens } from "@/src/theme/tokens";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./CardsScreen.styles";

const CardsScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerWrapper}>
        <Text style={styles.title} accessibilityRole="header">
          {tokens.textMeusCartoes}
        </Text>
        <Text style={styles.subtitle}>{tokens.textConfigCardsSubtitle}</Text>
      </View>

      <PersonalCards />
    </ScrollView>
  );
};

export default CardsScreen;
