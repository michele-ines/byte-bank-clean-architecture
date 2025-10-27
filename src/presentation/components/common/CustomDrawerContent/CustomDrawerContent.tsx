import { useAuth } from "@presentation/state/AuthContext";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import type { JSX } from "react";
import React from "react";
import { Text, View } from "react-native";
import { DefaultButton } from "../common/DefaultButton/DefaultButton";
import { styles } from "./CustomDrawerContent.styles";

type CustomDrawerContentProps = DrawerContentComponentProps;

export function CustomDrawerContent(
  props: Readonly<CustomDrawerContentProps>
): JSX.Element {
  const { user, userData, signOut } = useAuth();

  const handleLogout = (): void => {
    signOut();
  };

  const displayName =
    userData?.name ??
    user?.displayName ??
    user?.email?.split("@")[0] ??
    "Usuário";

  const email = userData?.email ?? user?.email ?? "sem-email";

  const initials = displayName
    .split(" ")
    .map((n: string) => n[0] ?? "")
    .join("")
    .toUpperCase();

  return (
    <View style={styles.container}>
      <View
        style={styles.header}
        accessible
        accessibilityRole="header"
        accessibilityLabel="Informações do usuário"
      >
        <View
          style={styles.avatarCircle}
          accessible
          accessibilityRole="image"
          accessibilityLabel={`Avatar de ${displayName}`}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <Text style={styles.userName}>{displayName}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        accessible
        accessibilityLabel="Menu de navegação"
      >
        <DrawerItemList {...props} />

        <DefaultButton
          title="Sair"
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
          textStyle={styles.logoutButtonText}
          accessibilityLabel="Sair da conta"
          accessibilityHint="Finaliza a sessão e retorna para a tela inicial"
        />
      </DrawerContentScrollView>
    </View>
  );
}
