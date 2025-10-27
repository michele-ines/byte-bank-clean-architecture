import { MaterialIcons } from "@expo/vector-icons";
import { sizes, texts } from "@presentation/theme";
import type { JSX } from "react";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { Props } from "../../ProfileStyles/profile.styles.types";
import WidgetSettingsModal from "../WidgetSettingsModal/WidgetSettingsModal";
import { styles } from "./WidgetPreferencesButton.styles";

export default function WidgetPreferencesButton({ style }: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <View style={style}>
      <Pressable
        style={styles.button}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={texts.a11yAbrirWidgetPrefs}
      >
        <MaterialIcons
          name="widgets"
          size={sizes.iconMd}
          color={styles.icon.color}
        />
        <Text style={styles.buttonText}>
          {texts.textPersonalizarWidgets}
        </Text>
      </Pressable>

      <WidgetSettingsModal open={open} onClose={() => setOpen(false)} />
    </View>
  );
}
