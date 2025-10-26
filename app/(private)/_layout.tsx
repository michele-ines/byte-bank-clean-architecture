import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { JSX } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View
} from "react-native";


import { MaterialIcons } from "@expo/vector-icons";
import { CustomDrawerContent } from "@presentation/components/common/CustomDrawerContent/CustomDrawerContent";
import { Header } from "@presentation/layout/Header/Header";
import { useAuth } from "@presentation/state/AuthContext";
import { colors, radius, spacing, typography } from "@presentation/theme";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { AppLayoutStyles } from "@shared/ProfileStyles/profile.styles.types";
import { SafeAreaView } from "react-native-safe-area-context";

const drawerIcons = {
  home: "home",
  cards: "credit-card",
  invest: "trending-up",
  services: "apps",
  account: "person",
  logout: "logout",
} as const;

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
          color={colors.byteColorGreen500}
          accessibilityElementsHidden={false}
        />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
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
          drawerActiveTintColor: colors.byteColorGreen500,
          drawerInactiveTintColor: colors.byteGray100,
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
          name="minha-conta"
          options={{
            drawerLabel: "Minha conta",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons
                name={drawerIcons.account}
                size={size}
                color={color}
                accessibilityLabel="Abrir seção minha conta"
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create<AppLayoutStyles>({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.byteBgDefault,
  },
  drawerStyle: {
    backgroundColor: colors.byteColorDash,
  },
  drawerLabel: {
    color: colors.byteGray50,
    fontSize: typography.textSm,
    fontWeight: typography.fontMedium,
  },
  drawerItem: {
    borderRadius: radius.md,
    marginHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
});
