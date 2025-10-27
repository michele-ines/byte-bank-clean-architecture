/* eslint-disable @typescript-eslint/explicit-function-return-type */
import CardPixel3 from "@assets/images/dash-card-my-account/card-pixels-3.svg";
import CardPixel4 from "@assets/images/dash-card-my-account/card-pixels-4.svg";
import MyAccountIllustration from "@assets/images/dash-card-my-account/ilustracao-card-accout.svg";

import { CardMinhaConta } from "@presentation/components/cards/CardMinhaConta/CardMinhaConta";
import React from "react";
import { View } from "react-native";
import { styles } from "./MinhaContaScreen.styles";

export default function MyAccountPage() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.cardContainer}>
        <CardPixel3 style={styles.pixelTop} />
        <CardMinhaConta />
        <View style={styles.IllustrationsContainer}>
          <MyAccountIllustration style={styles.illustration} />
        </View>
        <CardPixel4 style={styles.pixelBottom} />
      </View>
    </View>
  );
}
