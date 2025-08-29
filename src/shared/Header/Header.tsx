import { Feather } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "../../theme/tokens";

export const Header: React.FC = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={openDrawer} hitSlop={20}>
        <Feather name="menu" size={24} color={tokens.byteColorGreen500} />
      </Pressable>
      <Text style={styles.logo}>Bytebank</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 40, 
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: tokens.byteColorDash,
    gap: 20,
  },
  logo: {
    color: tokens.byteColorGreen500,
    fontSize: 20,
    fontWeight: "700",
  },
})