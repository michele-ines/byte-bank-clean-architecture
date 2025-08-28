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
  const { signOut } = useAuth();

  const handleLogout = (): void => {
    signOut();
  };

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
          accessibilityLabel="Foto de perfil de Michele Sabri"
        >
          <Text
            style={styles.avatarText}
            accessibilityRole="text"
            accessibilityLabel="Iniciais do usuário: M S"
          >
            MS
          </Text>
        </View>

        <Text
          style={styles.userName}
          accessibilityRole="text"
          accessibilityLabel="Nome do usuário: Michele Sabri"
        >
          Michele Sabri
        </Text>

        <Text
          style={styles.userEmail}
          accessibilityRole="text"
          accessibilityLabel="E-mail do usuário: michele@email.com"
        >
          michele@email.com
        </Text>
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
          <Text
            style={styles.logoutButtonText}
            accessibilityRole="text"
            accessibilityLabel="Botão de logout"
          >
            Sair
          </Text>
        </Pressable>
      </DrawerContentScrollView>
    </View>
  );
}
