import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { JSX } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { CustomDrawerContent } from "@/src/components/CustomDrawerContent/CustomDrawerContent";
import { useAuth } from "@/src/contexts/AuthContext";
import { Header } from "@/src/shared/Header/Header";
import { tokens } from "@/src/theme/tokens";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const drawerIcons = {
  home: "home",
  cards: "credit-card",
  invest: "trending-up",
  services: "apps",
  logout: "logout",
} as const;

type Styles = {
  loaderContainer: ViewStyle;
  drawerStyle: ViewStyle;
  drawerLabel: TextStyle;
  drawerItem: ViewStyle;
};

export default function AppLayout(): JSX.Element {
  const { isAuthenticated, loading, signOut } = useAuth();

  if (loading) {
    return (
      <View
        style={styles.loaderContainer}
        accessibilityRole="progressbar"
        accessibilityLabel="Carregando conteúdo"
        accessibilityLiveRegion="polite"
      >
        <ActivityIndicator
          size="large"
          color={tokens.byteColorGreen500}
          accessibilityElementsHidden={false}
        />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawerContent {...props} />
        )}
        screenOptions={{
          headerShown: true,
          header: () => (
            <View accessibilityRole="header">
              <Header />
            </View>
          ),
          drawerStyle: styles.drawerStyle,
          drawerLabelStyle: styles.drawerLabel,
          drawerActiveTintColor: tokens.byteColorGreen500,
          drawerInactiveTintColor: tokens.byteGray100,
          drawerItemStyle: styles.drawerItem,
        }}
      >
        <Drawer.Screen
          name="dashboard"
          options={{
            drawerLabel: "Início",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons
                name={drawerIcons.home}
                size={size}
                color={color}
                accessibilityLabel="Ir para a página inicial"
              />
            ),
          }}
        />
        <Drawer.Screen
          name="meus-cartoes"
          options={{
            drawerLabel: "Meus Cartões",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons
                name={drawerIcons.cards}
                size={size}
                color={color}
                accessibilityLabel="Abrir seção Meus Cartões"
              />
            ),
          }}
        />
        <Drawer.Screen
          name="investments"
          options={{
            drawerLabel: "Investimentos",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons
                name={drawerIcons.invest}
                size={size}
                color={color}
                accessibilityLabel="Abrir seção Investimentos"
              />
            ),
          }}
        />
        <Drawer.Screen
          name="outros-servicos"
          options={{
            drawerLabel: "Outros Serviços",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons
                name={drawerIcons.services}
                size={size}
                color={color}
                accessibilityLabel="Abrir seção Outros Serviços"
              />
            ),
          }}
        />
        <Drawer.Screen
          name="logout"
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault();
              signOut();
            },
          }}
          options={{
            drawerLabel: "Sair",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons
                name={drawerIcons.logout}
                size={size}
                color={color}
                accessibilityLabel="Sair da conta"
                accessibilityHint="Encerra a sessão e retorna à tela inicial"
              />
            ),
          }}
        />
      </Drawer>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tokens.byteBgDefault,
  },
  drawerStyle: {
    backgroundColor: tokens.byteColorDash,
  },
  drawerLabel: {
    color: tokens.byteGray50,
    fontSize: tokens.textSm,
    fontWeight: tokens.fontMedium,
  },
  drawerItem: {
    borderRadius: tokens.radiusMd,
    marginHorizontal: tokens.spacingSm,
    paddingVertical: tokens.spacingXs,
  },
});
