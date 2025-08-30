import { Footer } from "@/src/shared/Footer/Footer";
import { Header } from "@/src/shared/Header/Header";
import { tokens } from "@/src/theme/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";

// 📌 Ícones e ilustrações
import BannerIlustracao from "@/assets/images/page/banner-ilustracao.svg";
import IconDispositivos from "@/assets/images/page/icon-dispositivos.svg";
import IconPontos from "@/assets/images/page/icon-pontos.svg";
import IconPresente from "@/assets/images/page/icon-presente.svg";
import IconSaque from "@/assets/images/page/icon-saque.svg";

import { styles } from "./MainScreen.styles";

// 📌 Textos centralizados
const mainScreenTexts = {
  hero: {
    title: "Experimente mais liberdade no controle da sua vida financeira.",
    subtitle: "Crie sua conta com a gente!", // ✅ subtítulo que você pediu
  },
  buttons: {
    openAccount: "Abrir conta",
    login: "Já tenho conta",
  },
  advantages: {
    title: "Vantagens do nosso banco:",
    features: {
      freeAccount: {
        title: "Conta e cartão gratuitos",
        description:
          "Isso mesmo, nossa conta é digital,\nsem custo fixo e mais que isso:\nsem tarifa de manutenção.",
      },
      freeWithdrawals: {
        title: "Saques sem custo",
        description:
          "Você pode sacar gratuitamente 4x\npor mês de qualquer Banco 24h.",
      },
      pointsProgram: {
        title: "Programa de pontos",
        description:
          "Você pode acumular pontos com\nsuas compras no crédito sem pagar\nmensalidade!",
      },
      deviceInsurance: {
        title: "Seguro Dispositivos",
        description:
          "Seus dispositivos móveis\n(computador e laptop) protegidos\npor uma mensalidade simbólica.",
      },
    },
  },
};

const MainScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      {/* Fundo gradiente */}
      <LinearGradient
        colors={[tokens.gradientTealFrom, tokens.gradientTealTo]}
        style={styles.gradientBg}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>{mainScreenTexts.hero.title}</Text>
            <Text style={styles.heroSubtitle}>
              {mainScreenTexts.hero.subtitle}
            </Text>

            <BannerIlustracao
              width={"100%"}
              height={tokens.illustrationSignupHeight}
              accessibilityLabel="Ilustração de pessoa com gráfico financeiro"
            />

            {/* Botões */}
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[styles.btn, styles.btnPrimary]}
                accessibilityRole="button"
                accessibilityLabel={mainScreenTexts.buttons.openAccount}
                onPress={() => router.push("/(public)/cadastro/CadastroPage")}
              >
                <Text style={styles.btnPrimaryText}>
                  {mainScreenTexts.buttons.openAccount}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.btnSecondary]}
                accessibilityRole="button"
                accessibilityLabel={mainScreenTexts.buttons.login}
                onPress={() => router.push("/(public)/login/login")}
              >
                <Text style={styles.btnSecondaryText}>
                  {mainScreenTexts.buttons.login}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Vantagens */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {mainScreenTexts.advantages.title}
            </Text>

            <FeatureCard
              Icon={IconPresente}
              title={mainScreenTexts.advantages.features.freeAccount.title}
              description={
                mainScreenTexts.advantages.features.freeAccount.description
              }
            />

            <FeatureCard
              Icon={IconSaque}
              title={mainScreenTexts.advantages.features.freeWithdrawals.title}
              description={
                mainScreenTexts.advantages.features.freeWithdrawals.description
              }
            />

            <FeatureCard
              Icon={IconPontos}
              title={mainScreenTexts.advantages.features.pointsProgram.title}
              description={
                mainScreenTexts.advantages.features.pointsProgram.description
              }
            />

            <FeatureCard
              Icon={IconDispositivos}
              title={mainScreenTexts.advantages.features.deviceInsurance.title}
              description={
                mainScreenTexts.advantages.features.deviceInsurance.description
              }
            />
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
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
}) => (
  <View style={styles.card}>
    <Icon
      width={tokens.avatarMd}
      height={tokens.avatarMd}
      accessibilityLabel={title}
    />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);
