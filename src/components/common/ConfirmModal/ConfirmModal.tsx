import { DefaultButton } from "@/src/components/common/DefaultButton/DefaultButton";
import { ConfirmModalProps } from "@/src/shared/ProfileStyles/profile.styles.types";
import { colors } from "@/src/theme/colors";
import { texts } from "@/src/theme/texts";
import React from "react";
import { Modal, Text, View } from "react-native";
import { styles } from "./ConfirmModal.styles";

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = texts.textConfirmar,
  cancelText = texts.textCancelar,
  isDestructive,
  loading,
  onConfirm,
  onCancel,
}: Readonly<ConfirmModalProps>) {
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
          <DefaultButton
            title={cancelText}
            onPress={onCancel}
            loading={false}
            disabled={loading}
            buttonStyle={[styles.btn, styles.btnGhost]}
            textStyle={styles.btnGhostText}
            accessibilityLabel={cancelText}
            accessibilityHint={texts.a11yCancelar}
          />

          {/* Confirmar */}
          <DefaultButton
            title={confirmText}
            onPress={onConfirm}
            loading={loading}
            disabled={loading}
            buttonStyle={[
              styles.btn,
              isDestructive ? styles.btnDanger : styles.btnPrimary,
              loading && styles.loadingBtn,
            ]}
            textStyle={styles.btnText}
            accessibilityLabel={confirmText}
            accessibilityHint={texts.a11yConfirmar}
            indicatorColor={colors.byteColorWhite}
          />
        </View>
      </View>
    </Modal>
  );
}
