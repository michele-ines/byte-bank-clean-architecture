import { Footer } from "@/src/shared/Footer/Footer";
import { Header } from "@/src/shared/Header/Header";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";

import BannerIlustracao from "@/assets/images/page/banner-ilustracao.svg";
import IconDispositivos from "@/assets/images/page/icon-dispositivos.svg";
import IconPontos from "@/assets/images/page/icon-pontos.svg";
import IconPresente from "@/assets/images/page/icon-presente.svg";
import IconSaque from "@/assets/images/page/icon-saque.svg";

import { texts } from "@/src/theme";
import { colors } from "@/src/theme/colors";
import { sizes } from "@/src/theme/sizes";
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
              <Text style={styles.heroTitle}>{texts.mainScreen.hero.title}</Text>
              <Text style={styles.heroSubtitle}>
                {texts.mainScreen.hero.subtitle}
              </Text>

              <BannerIlustracao
                width={"100%"}
                height={sizes.illustrationSignupHeight}
                accessibilityLabel="Ilustração de pessoa com gráfico financeiro"
              />

              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnPrimary]}
                  onPress={() => router.push("/(public)/cadastro/CadastroPage")}
                >
                  <Text style={styles.btnPrimaryText}>
                    {texts.mainScreen.buttons.openAccount}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, styles.btnSecondary]}
                  onPress={() => router.push("/(public)/login/login")}
                >
                  <Text style={styles.btnSecondaryText}>
                    {texts.mainScreen.buttons.login}
                  </Text>
                </TouchableOpacity>
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
