import { useAuth } from "@/src/contexts/AuthContext";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./CustomDrawerContent.styles";

type CustomDrawerContentProps = DrawerContentComponentProps;

export function CustomDrawerContent(props: CustomDrawerContentProps) {
  const { user, userData, signOut } = useAuth();

  const handleLogout = (): void => {
    signOut();
  };

  const displayName =
    userData?.name ?? user?.displayName ?? user?.email?.split("@")[0] ?? "Usuário";

  const email = userData?.email ?? user?.email ?? "sem-email";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
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

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && { opacity: 0.7 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
          accessibilityHint="Finaliza a sessão e retorna para a tela inicial"
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
        </Pressable>
      </DrawerContentScrollView>
    </View>
  );
}
