import { tokens } from "@/src/theme/tokens";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { styles } from "./ConfirmModal.styles";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = tokens.textConfirmar,
  cancelText = tokens.textCancelar,
  isDestructive,
  loading,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      accessibilityViewIsModal={true}
      accessibilityLabel={title}
    >
      <View style={styles.backdrop} />

      <View
        style={styles.sheet}
        accessibilityRole="alert"
        accessibilityLabel={title}
      >
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.msg}>{message}</Text>

        <View style={styles.row}>
          {/* Cancelar */}
          <Pressable
            style={({ pressed }) => [
              styles.btn,
              styles.btnGhost,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={cancelText}
            accessibilityHint={tokens.a11yCancelar}
            onPress={onCancel}
            disabled={loading}
          >
            <Text style={styles.btnGhostText}>{cancelText}</Text>
          </Pressable>

          {/* Confirmar */}
          <Pressable
            style={({ pressed }) => [
              styles.btn,
              isDestructive ? styles.btnDanger : styles.btnPrimary,
              pressed && styles.pressed,
              loading && styles.loadingBtn,
            ]}
            accessibilityRole="button"
            accessibilityLabel={confirmText}
            accessibilityHint={tokens.a11yConfirmar}
            onPress={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={tokens.byteColorWhite} />
            ) : (
              <Text style={styles.btnText}>{confirmText}</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
