import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./Footer.styles";

import InstaSvg from "@assets/images/footer/ft-instagram.svg";
import LogoSvg from "@assets/images/footer/ft-logo.svg";
import WaSvg from "@assets/images/footer/ft-whatsapp.svg";
import YtSvg from "@assets/images/footer/ft-youtube.svg";
import { sizes, spacing } from "@presentation/theme";

export const Footer: React.FC = () => {
  return (
    <View
      style={styles.container}
      accessibilityLabel="Rodapé do aplicativo com informações de serviços, contato e redes sociais"
    >
      {/* Serviços */}
      <View style={styles.section}>
        <Text style={styles.title} accessibilityRole="header">
          Serviços
        </Text>
        <Pressable accessibilityRole="link" accessibilityLabel="Acessar conta corrente">
          <Text style={styles.link}>Conta corrente</Text>
        </Pressable>
        <Pressable accessibilityRole="link" accessibilityLabel="Acessar conta PJ">
          <Text style={styles.link}>Conta PJ</Text>
        </Pressable>
        <Pressable accessibilityRole="link" accessibilityLabel="Acessar cartão de crédito">
          <Text style={styles.link}>Cartão de crédito</Text>
        </Pressable>
      </View>

      {/* Contato */}
      <View style={styles.section}>
        <Text style={styles.title} accessibilityRole="header">
          Contato
        </Text>
        <Text style={styles.link} accessibilityLabel="Telefone 0800 504 3058">
          0800 504 3058
        </Text>
        <Text style={styles.link} accessibilityLabel="E-mail suporte arroba bytebank ponto com">
          suporte@bytebank.com
        </Text>
        <Text style={styles.link} accessibilityLabel="E-mail contato arroba bytebank ponto com">
          contato@bytebank.com
        </Text>
      </View>

      {/* Desenvolvido */}
      <View style={styles.section}>
        <Text style={styles.title}>Desenvolvido por Front-End</Text>
        <LogoSvg
          width={sizes.logoWidth}
          height={sizes.logoHeight}
          style={{ marginTop: spacing.xs2 }}
          accessibilityLabel="Logo da Bytebank"
        />
        <View style={styles.social}>
          <Pressable accessibilityRole="link" accessibilityLabel="Visitar Instagram">
            <InstaSvg width={22} height={22} />
          </Pressable>
          <Pressable accessibilityRole="link" accessibilityLabel="Visitar YouTube">
            <YtSvg width={22} height={22} />
          </Pressable>
          <Pressable accessibilityRole="link" accessibilityLabel="Conversar no WhatsApp">
            <WaSvg width={22} height={22} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
