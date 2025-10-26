
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";

import BannerIlustracao from "@/assets/images/page/banner-ilustracao.svg";
import IconDispositivos from "@/assets/images/page/icon-dispositivos.svg";
import IconPontos from "@/assets/images/page/icon-pontos.svg";
import IconPresente from "@/assets/images/page/icon-presente.svg";
import IconSaque from "@/assets/images/page/icon-saque.svg";


import { DefaultButton } from "@presentation/components/common/common/DefaultButton/DefaultButton";
import { Footer } from "@presentation/layout/Footer/Footer";
import { Header } from "@presentation/layout/Header/Header";
import { colors, sizes, texts } from "@presentation/theme";
import { routes } from "@shared/constants/routes";
import { styles } from "./MainScreen.styles";

const MainScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />

      <LinearGradient
        colors={[colors.gradientTealFrom, colors.gradientTealTo]}
        style={styles.gradientBg}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.innerContent}>
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>
                {texts.mainScreen.hero.title}
              </Text>
              <Text style={styles.heroSubtitle}>
                {texts.mainScreen.hero.subtitle}
              </Text>

              <BannerIlustracao
                width={"100%"}
                height={sizes.illustrationSignupHeight}
                accessibilityLabel="Ilustração de pessoa com gráfico financeiro"
              />

              <View style={styles.buttonsRow}>
                <DefaultButton
                  title={texts.mainScreen.buttons.openAccount}
                  onPress={() => router.push(routes.signup)}
                  buttonStyle={[styles.btn, styles.btnPrimary]}
                  textStyle={styles.btnPrimaryText}
                  accessibilityLabel={texts.mainScreen.buttons.openAccount}
                />

                <DefaultButton
                  title={texts.mainScreen.buttons.login}
                  onPress={() => router.push(routes.login)}
                  buttonStyle={[styles.btn, styles.btnSecondary]}
                  textStyle={styles.btnSecondaryText}
                  accessibilityLabel={texts.mainScreen.buttons.login}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {texts.mainScreen.advantages.title}
              </Text>

              <FeatureCard
                Icon={IconPresente}
                title={texts.mainScreen.advantages.features.freeAccount.title}
                description={
                  texts.mainScreen.advantages.features.freeAccount.description
                }
                descriptionStyle={{ color: colors.byteTextMediumGray }}
              />

              <FeatureCard
                Icon={IconSaque}
                title={
                  texts.mainScreen.advantages.features.freeWithdrawals.title
                }
                description={
                  texts.mainScreen.advantages.features.freeWithdrawals
                    .description
                }
              />

              <FeatureCard
                Icon={IconPontos}
                title={texts.mainScreen.advantages.features.pointsProgram.title}
                description={
                  texts.mainScreen.advantages.features.pointsProgram.description
                }
              />

              <FeatureCard
                Icon={IconDispositivos}
                title={
                  texts.mainScreen.advantages.features.deviceInsurance.title
                }
                description={
                  texts.mainScreen.advantages.features.deviceInsurance
                    .description
                }
              />
            </View>
          </View>

          <Footer />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default MainScreen;

/* ============================ Feature Card ============================ */
type FeatureCardProps = {
  Icon: React.FC<SvgProps>;
  title: string;
  description: string;
  descriptionStyle?: object;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
  descriptionStyle,
}) => (
  <View style={styles.card}>
    <Icon
      width={sizes.avatarMd}
      height={sizes.avatarMd}
      accessibilityLabel={title}
    />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={[styles.cardDescription, descriptionStyle]}>
      {description}
    </Text>
  </View>
);
