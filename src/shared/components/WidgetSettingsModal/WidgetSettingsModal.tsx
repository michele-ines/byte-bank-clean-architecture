import { useWidgetPreferences } from "@/src/contexts/WidgetPreferencesContext";
import { tokens } from "@/src/theme/tokens";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { styles } from "./WidgetSettingsModal.styles";

type WidgetSettingsModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function WidgetSettingsModal({
  open,
  onClose,
}: Readonly<WidgetSettingsModalProps>) {
  const { preferences, updatePreferences } = useWidgetPreferences();
  const [tempPrefs, setTempPrefs] = useState(preferences);

  useEffect(() => {
    if (open) setTempPrefs(preferences);
  }, [open, preferences]);

  function toggleTemp(key: keyof typeof tempPrefs) {
    setTempPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleConfirm() {
    updatePreferences(tempPrefs);
    onClose();
  }

  return (
    <Modal visible={open} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title} accessibilityRole="header">
            {tokens.textPersonalizarWidgets}
          </Text>
          <Text style={styles.description}>{tokens.textEscolhaWidgets}</Text>

          <ScrollView>
            {/* CARD: Alerta de Gastos */}
            <Pressable
              style={[styles.card, tempPrefs.spendingAlert && styles.cardSelected]}
              onPress={() => toggleTemp("spendingAlert")}
              accessibilityRole="button"
              accessibilityLabel={tokens.a11ySpendingAlert}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{tokens.textAlertaGastos}</Text>
                <Switch
                  value={tempPrefs.spendingAlert}
                  onValueChange={() => toggleTemp("spendingAlert")}
                  accessibilityLabel={tokens.a11yToggleSpendingAlert}
                />
              </View>
              <Text style={styles.cardText}>{tokens.textDescricaoGastos}</Text>

              <View style={styles.previewBox}>
                <View style={styles.previewHeader}>
                  <MaterialIcons
                    name="bar-chart"
                    size={tokens.iconSm}
                    color={styles.icon.color}
                  />
                  <Text style={styles.previewTitle}>{tokens.textPreviewWidget}</Text>
                </View>
                <Text style={styles.previewText}>{tokens.textPreviewGastos}</Text>
                <View style={styles.previewFooter}>
                  <Text style={styles.previewFooterText}>
                    {tokens.textLimiteAtual}:{" "}
                    <Text style={styles.bold}>{tokens.valorLimiteAtual}</Text>
                  </Text>
                  <Text style={styles.previewFooterText}>
                    {tokens.textGasto}:{" "}
                    <Text style={styles.dangerText}>{tokens.valorGasto}</Text>
                  </Text>
                </View>
              </View>
            </Pressable>

            {/* CARD: Meta de Economia */}
            <Pressable
              style={[styles.card, tempPrefs.savingsGoal && styles.cardSelected]}
              onPress={() => toggleTemp("savingsGoal")}
              accessibilityRole="button"
              accessibilityLabel={tokens.a11ySavingsGoal}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{tokens.textMetaEconomia}</Text>
                <Switch
                  value={tempPrefs.savingsGoal}
                  onValueChange={() => toggleTemp("savingsGoal")}
                  accessibilityLabel={tokens.a11yToggleSavingsGoal}
                />
              </View>
              <Text style={styles.cardText}>{tokens.textDescricaoEconomia}</Text>

              <View style={styles.previewBox}>
                <View style={styles.previewHeader}>
                  <MaterialIcons
                    name="savings"
                    size={tokens.iconSm}
                    color={styles.icon.color}
                  />
                  <Text style={styles.previewTitle}>{tokens.textPreviewWidget}</Text>
                </View>
                <Text style={styles.previewText}>{tokens.textPreviewEconomia}</Text>
                <View style={styles.previewFooter}>
                  <Text style={styles.previewFooterText}>
                    {tokens.textMetaAtual}:{" "}
                    <Text style={styles.bold}>{tokens.valorMetaAtual}</Text>
                  </Text>
                  <Text style={styles.previewFooterText}>
                    {tokens.textEconomizado}:{" "}
                    <Text style={styles.successText}>{tokens.valorEconomizado}</Text>
                  </Text>
                </View>
              </View>
            </Pressable>
          </ScrollView>

          {/* Botões */}
          <View style={styles.actions}>
            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={tokens.a11yCancelar}
            >
              <Text style={styles.cancelText}>{tokens.textCancelar}</Text>
            </Pressable>
            <Pressable
              style={styles.confirmButton}
              onPress={handleConfirm}
              accessibilityRole="button"
              accessibilityLabel={tokens.a11yConfirmar}
            >
              <Text style={styles.confirmText}>{tokens.textConfirmar}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
