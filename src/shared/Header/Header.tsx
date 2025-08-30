import { useAuth } from "@/src/contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { GestureResponderEvent, Pressable, View } from "react-native";
import { tokens } from "../../theme/tokens";
import { styles } from "./Header.styles";

import HeaderLogo from "@/assets/images/header/header-logo.svg";

export const Header: React.FC = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  const openDrawer = (event: GestureResponderEvent) => {
    event.preventDefault();
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isAuthenticated
            ? tokens.byteColorDash 
            : tokens.byteColorBlack, 
        },
      ]}
      accessibilityRole="header"
    >
      {isAuthenticated ? (
        <View style={styles.row}>
          <Pressable
            onPress={openDrawer}
            hitSlop={tokens.spacingSm}
            accessibilityRole="button"
            accessibilityLabel="Abrir menu de navegação lateral"
            accessibilityHint="Abre o menu lateral com opções de navegação"
          >
            <Feather
              name="menu"
              size={tokens.textLg}
              color={tokens.byteColorGreen500}
            />
          </Pressable>

          <Pressable
            onPress={() => router.push("/")}
            accessibilityRole="imagebutton"
            accessibilityLabel="Logotipo Bytebank, voltar para Home"
          >
            <HeaderLogo
              width={tokens.logoWidth}
              height={tokens.logoHeight}
            />
          </Pressable>
        </View>
      ) : (

        <Pressable
          onPress={() => router.push("/")}
          style={styles.centerLogo}
          accessibilityRole="imagebutton"
          accessibilityLabel="Logotipo Bytebank, voltar para Home"
        >
          <HeaderLogo
            width={tokens.logoWidth}
            height={tokens.logoHeight}
          />
        </Pressable>
      )}
    </View>
  );
};
