import { MaterialIcons } from "@expo/vector-icons";
import { useWidgetPreferences } from "@presentation/state/WidgetPreferencesContext";
import { sizes, texts } from "@presentation/theme";
import type { JSX } from "react";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Switch, Text, View } from "react-native";
import type { WidgetSettingsModalProps } from "../../ProfileStyles/profile.styles.types";
import { styles } from "./WidgetSettingsModal.styles";

export default function WidgetSettingsModal({
  open,
  onClose,
}: Readonly<WidgetSettingsModalProps>): JSX.Element {
  const { preferences, updatePreferences } = useWidgetPreferences();
  const [tempPrefs, setTempPrefs] = useState(preferences);

  useEffect((): void => {
    if (open) setTempPrefs(preferences);
  }, [open, preferences]);

  function toggleTemp(key: keyof typeof tempPrefs): void {
    setTempPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleConfirm(): void {
    updatePreferences(tempPrefs);
    onClose();
  }

  return (
    <Modal visible={open} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title} accessibilityRole="header">
            {texts.textPersonalizarWidgets}
          </Text>
          <Text style={styles.description}>{texts.textEscolhaWidgets}</Text>

          <ScrollView>
            <Pressable
              style={[
                styles.card,
                tempPrefs.spendingAlert && styles.cardSelected,
              ]}
              onPress={() => toggleTemp("spendingAlert")}
              accessibilityRole="button"
              accessibilityLabel={texts.a11ySpendingAlert}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{texts.textAlertaGastos}</Text>
                <Switch
                  value={tempPrefs.spendingAlert}
                  onValueChange={() => toggleTemp("spendingAlert")}
                  accessibilityLabel={texts.a11yToggleSpendingAlert}
                />
              </View>
              <Text style={styles.cardText}>{texts.textDescricaoGastos}</Text>

              <View style={styles.previewBox}>
                <View style={styles.previewHeader}>
                  <MaterialIcons
                    name="bar-chart"
                    size={sizes.iconSm}
                    color={styles.icon.color}
                  />
                  <Text style={styles.previewTitle}>
                    {texts.textPreviewWidget}
                  </Text>
                </View>
                <Text style={styles.previewText}>
                  {texts.textPreviewGastos}
                </Text>
                <View style={styles.previewFooter}>
                  <Text style={styles.previewFooterText}>
                    {texts.textLimiteAtual}:{" "}
                    <Text style={styles.bold}>{texts.valorLimiteAtual}</Text>
                  </Text>
                  <Text style={styles.previewFooterText}>
                    {texts.textGasto}:{" "}
                    <Text style={styles.dangerText}>{texts.valorGasto}</Text>
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              style={[
                styles.card,
                tempPrefs.savingsGoal && styles.cardSelected,
              ]}
              onPress={() => toggleTemp("savingsGoal")}
              accessibilityRole="button"
              accessibilityLabel={texts.a11ySavingsGoal}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{texts.textMetaEconomia}</Text>
                <Switch
                  value={tempPrefs.savingsGoal}
                  onValueChange={() => toggleTemp("savingsGoal")}
                  accessibilityLabel={texts.a11yToggleSavingsGoal}
                />
              </View>
              <Text style={styles.cardText}>{texts.textDescricaoEconomia}</Text>

              <View style={styles.previewBox}>
                <View style={styles.previewHeader}>
                  <MaterialIcons
                    name="savings"
                    size={sizes.iconSm}
                    color={styles.icon.color}
                  />
                  <Text style={styles.previewTitle}>
                    {texts.textPreviewWidget}
                  </Text>
                </View>
                <Text style={styles.previewText}>
                  {texts.textPreviewEconomia}
                </Text>
                <View style={styles.previewFooter}>
                  <Text style={styles.previewFooterText}>
                    {texts.textMetaAtual}:{" "}
                    <Text style={styles.bold}>{texts.valorMetaAtual}</Text>
                  </Text>
                  <Text style={styles.previewFooterText}>
                    {texts.textEconomizado}:{" "}
                    <Text style={styles.successText}>
                      {texts.valorEconomizado}
                    </Text>
                  </Text>
                </View>
              </View>
            </Pressable>
          </ScrollView>

          <View style={styles.actions}>
            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={texts.a11yCancelar}
            >
              <Text style={styles.cancelText}>{texts.textCancelar}</Text>
            </Pressable>
            <Pressable
              style={styles.confirmButton}
              onPress={handleConfirm}
              accessibilityRole="button"
              accessibilityLabel={texts.a11yConfirmar}
            >
              <Text style={styles.confirmText}>{texts.textConfirmar}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
