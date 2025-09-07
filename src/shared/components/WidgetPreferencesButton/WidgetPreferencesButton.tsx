import { tokens } from "@/src/theme/tokens";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import WidgetSettingsModal from "../WidgetSettingsModal/WidgetSettingsModal";
import { styles } from "./WidgetPreferencesButton.styles";

export default function WidgetPreferencesButton() {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Pressable
        style={styles.button}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={tokens.a11yAbrirWidgetPrefs} 
      >
        <MaterialIcons
          name="widgets"
          size={tokens.iconMd} 
          color={styles.icon.color}
        />
        <Text style={styles.buttonText}>
          {tokens.textPersonalizarWidgets} 
        </Text>
      </Pressable>

      <WidgetSettingsModal open={open} onClose={() => setOpen(false)} />
    </View>
  );
}
