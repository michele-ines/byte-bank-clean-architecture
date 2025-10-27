import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import type { GestureResponderEvent } from "react-native";
import { Pressable, View } from "react-native";
import { styles } from "./Header.styles";

import HeaderLogo from "@assets/images/header/header-logo.svg";
import { useAuth } from "@presentation/state/AuthContext";
import { colors, sizes, spacing, typography } from "@presentation/theme";

export const Header: React.FC = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  // ✅ Tipagem explícita adicionada
  const openDrawer = (event: GestureResponderEvent): void => {
    event.preventDefault();
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isAuthenticated
            ? colors.byteColorDash
            : colors.byteColorBlack,
        },
      ]}
      accessibilityRole="header"
    >
      {isAuthenticated ? (
        <View style={styles.row}>
          <Pressable
            onPress={openDrawer}
            hitSlop={spacing.sm}
            accessibilityRole="button"
            accessibilityLabel="Abrir menu de navegação lateral"
            accessibilityHint="Abre o menu lateral com opções de navegação"
          >
            <Feather
              name="menu"
              size={typography.textLg}
              color={colors.byteColorGreen500}
            />
          </Pressable>

          <Pressable
            onPress={() => router.push("/")}
            accessibilityRole="imagebutton"
            accessibilityLabel="Logotipo Bytebank, voltar para Home"
          >
            <HeaderLogo width={sizes.logoWidth} height={sizes.logoHeight} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => router.push("/")}
          style={styles.centerLogo}
          accessibilityRole="imagebutton"
          accessibilityLabel="Logotipo Bytebank, voltar para Home"
        >
          <HeaderLogo width={sizes.logoWidth} height={sizes.logoHeight} />
        </Pressable>
      )}
    </View>
  );
};
