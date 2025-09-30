import { useEditField } from "@/src/hooks/useEditField";
import { EditFieldModalProps } from "@/src/shared/ProfileStyles/profile.styles.types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./EditFieldModal.styles";

export function EditFieldModal({
  visible,
  field,
  initialValue,
  onClose,
}: Readonly<EditFieldModalProps>) {
  const {
    value,
    setValue,
    currentPassword,
    setCurrentPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    loading,
    setLoading,
    error,
    setError,
    updateEmail,
    updateName,
    updateUserPassword,
  } = useEditField(field, initialValue, onClose);

  const currentPasswordRef = useRef<TextInput>(
    null
  ) as React.RefObject<TextInput>;
  const mainFieldRef = useRef<TextInput>(null) as React.RefObject<TextInput>;

  const isPasswordField = field === "password";
  const requiresCurrentPassword = field === "email" || isPasswordField;

  useEffect(() => {
    if (visible) {
      setValue(initialValue);
      setCurrentPassword("");
      setError({ field: "", message: "" });
      setTimeout(() => {
        if (requiresCurrentPassword) {
          currentPasswordRef.current?.focus();
        } else {
          mainFieldRef.current?.focus();
        }
      }, 200);
    }
  }, [
    visible,
    initialValue,
    setValue,
    setCurrentPassword,
    setError,
    requiresCurrentPassword,
  ]);

  if (!field) return null;

  const getLabel = () =>
    ({
      name: "Editar nome",
      email: "Editar e-mail",
      password: "Alterar senha",
    }[field]);

  const handleSave = async () => {
    setLoading(true);

    try {
      if (field === "name") await updateName(value);
      if (field === "email") await updateEmail(value);
      if (isPasswordField) await updateUserPassword(value);
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordToggle = (
    visible: boolean,
    setVisible: (v: boolean) => void
  ) => (
    <TouchableOpacity
      onPress={() => setVisible(!visible)}
      style={styles.showPasswordBtn}
    >
      <MaterialIcons
        name={visible ? "visibility-off" : "visibility"}
        size={22}
        color={styles.input.color}
      />
    </TouchableOpacity>
  );

  const renderField = (
    label: string,
    fieldValue: string,
    setFieldValue: (v: string) => void,
    secureText: boolean,
    refProp?: React.RefObject<TextInput>
  ) => {
    let passwordToggle = null;
    if (isPasswordField && label === "Nova senha") {
      passwordToggle = renderPasswordToggle(
        showNewPassword,
        setShowNewPassword
      );
    } else if (requiresCurrentPassword && label === "Senha atual") {
      passwordToggle = renderPasswordToggle(
        showCurrentPassword,
        setShowCurrentPassword
      );
    }

    const handleChange = (v: string) => {
      setFieldValue(v);
      if (error.field) setError({ field: "", message: "" });
    };

    let fieldKey = "";
    if (isPasswordField && label === "Nova senha") fieldKey = "newPassword";
    else if (requiresCurrentPassword && label === "Senha atual")
      fieldKey = "currentPassword";
    else if (field === "email" && label === "Novo e-mail") fieldKey = "email";
    else if (field === "name" && label === "Novo nome") fieldKey = "name";

    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={refProp}
            style={styles.input}
            value={fieldValue}
            placeholderTextColor={styles.input.color}
            maxLength={50}
            onChangeText={handleChange}
            secureTextEntry={secureText}
            placeholder={label}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {passwordToggle}
        </View>
        {error.field === fieldKey ? (
          <Text style={styles.errorText}>{error.message}</Text>
        ) : null}
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.modalContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.modalTitle}>{getLabel()}</Text>

          {requiresCurrentPassword &&
            renderField(
              "Senha atual",
              currentPassword,
              setCurrentPassword,
              !showCurrentPassword,
              currentPasswordRef
            )}

          {(() => {
            let fieldLabel = "";
            if (isPasswordField) {
              fieldLabel = "Nova senha";
            } else if (field === "email") {
              fieldLabel = "Novo e-mail";
            } else {
              fieldLabel = "Novo nome";
            }
            return (
              <>
                {renderField(
                  fieldLabel,
                  value,
                  setValue,
                  isPasswordField && !showNewPassword,
                  !requiresCurrentPassword ? mainFieldRef : undefined
                )}
              </>
            );
          })()}

          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              {loading ? (
                <ActivityIndicator
                  color={styles.inputWrapper.backgroundColor}
                />
              ) : (
                <Text style={styles.saveButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
