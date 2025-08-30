import { useAuth } from "@/src/contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  View
} from "react-native";
import { tokens } from "../../theme/tokens";
import { styles } from "./Header.styles";

// Tipagem explícita do componente
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
            ? tokens.byteColorDash // logado
            : tokens.byteColorBlack, // visitante
        },
      ]}
      accessibilityRole="header"
      accessibilityLabel="Cabeçalho principal com logo e menu de navegação"
    >
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

      <Text
        style={styles.logo}
        accessibilityRole="text"
        accessibilityLabel="Logotipo Bytebank"
      >
        Bytebank
      </Text>
    </View>
  );
};
