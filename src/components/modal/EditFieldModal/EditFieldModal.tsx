import { db } from "@/src/config/firebaseConfig";
import { formTexts } from "@/src/constants/MinhaConta";
import { useAuth } from "@/src/contexts/AuthContext";
import { showToast } from "@/src/utils/toast";
import { MaterialIcons } from "@expo/vector-icons";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
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

type EditFieldModalProps = {
  visible: boolean;
  field: "name" | "email" | "password" | null;
  initialValue: string;
  onClose: () => void;
};

export function EditFieldModal({
  visible,
  field,
  initialValue,
  onClose,
}: Readonly<EditFieldModalProps>) {
  const { user } = useAuth();
  const [value, setValue] = useState(initialValue);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setValue(initialValue);
      setCurrentPassword("");
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [visible, initialValue]);

  if (!field) return null;

  const getLabel = () =>
    ({
      name: "Editar nome",
      email: "Editar e-mail",
      password: "Alterar senha",
    }[field]);

  const isPasswordField = field === "password";
  const requiresCurrentPassword = field === "email" || isPasswordField;

  const updateUserDataInFirestore = async (name?: string, email?: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        ...(name && { name }),
        ...(email && { email }),
        updatedAt: new Date(),
      });
    } catch (error: any) {
      showToast(
        "error",
        formTexts.toasts.error.generic.title,
        error?.message || formTexts.toasts.error.generic.message
      );
    }
  };
  const reauthenticate = async () => {
    if (!user?.email) {
      showToast(
        "error",
        formTexts.toasts.error.reauth.title,
        formTexts.toasts.error.reauth.message
      );
      throw new Error(formTexts.toasts.error.reauth.message);
    }

    if (!currentPassword) {
      showToast(
        "error",
        formTexts.toasts.error.reauth.title,
        formTexts.toasts.error.reauth.message
      );
      throw new Error(formTexts.toasts.error.reauth.message);
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      let message = formTexts.toasts.error.password.message;
      let title = formTexts.toasts.error.password.title;

      if (error instanceof FirebaseError) {
        if (error.code === "auth/wrong-password") {
          title = formTexts.toasts.error.reauthWrongPassword.title;
          message = formTexts.toasts.error.reauthWrongPassword.message;
        }

        showToast("error", title, message);
      }
    }
  };

  const updateName = async (name: string) => {
    if (!user) return;
    try {
      await updateProfile(user, { displayName: name });
      await updateUserDataInFirestore(name);
      showToast(
        "success",
        formTexts.toasts.success.name.title,
        formTexts.toasts.success.name.message
      );
      onClose();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : formTexts.toasts.error.name.message;
      showToast("error", formTexts.toasts.error.name.title, message);
    }
  };

  const updateEmail = async (email: string) => {
    if (!user) return;

    if (!currentPassword) {
      showToast(
        "error",
        formTexts.toasts.error.reauth.title,
        formTexts.toasts.error.reauth.message
      );
      return;
    }

    try {
      await reauthenticate();
      await verifyBeforeUpdateEmail(user, email);
      await updateUserDataInFirestore(undefined, email);
      showToast(
        "success",
        formTexts.toasts.success.email.title,
        formTexts.toasts.success.email.message
      );
      onClose();
    } catch (error) {
      let message = formTexts.toasts.error.email.message;

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            message = formTexts.toasts.error.emailInUse.message;
            break;
          case "auth/invalid-email":
            message = formTexts.toasts.error.invalidEmail.message;
            break;
        }
      }
      showToast("error", formTexts.toasts.error.email.title, message);
    }
  };

  const updateUserPassword = async (password: string) => {
    if (!user) return;

    if (!currentPassword) {
      showToast(
        "error",
        formTexts.toasts.error.reauth.title,
        formTexts.toasts.error.reauth.message
      );
      return;
    }
    try {
      await reauthenticate();
      await updatePassword(user, password);
      showToast(
        "success",
        formTexts.toasts.success.password.title,
        formTexts.toasts.success.password.message
      );
      onClose();
    } catch (error) {
      let message = formTexts.toasts.error.password.message;
      let title = formTexts.toasts.error.password.title;

      if (error instanceof Error) {
        if (error.message.includes("auth/wrong-password")) {
          title = formTexts.toasts.error.reauth.title;
          message = formTexts.toasts.error.reauth.message;
        } else if (error.message.includes("auth/weak-password")) {
          message = "A nova senha é muito fraca. Tente uma mais segura.";
        } else {
          message = error.message;
        }
      }

      showToast("error", title, message);
    }
  };

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
    secureText: boolean
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

    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={fieldValue}
            placeholderTextColor={styles.input.color}
            onChangeText={setFieldValue}
            secureTextEntry={secureText}
            placeholder={label}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {passwordToggle}
        </View>
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
              !showCurrentPassword
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
            return renderField(
              fieldLabel,
              value,
              setValue,
              isPasswordField && !showNewPassword
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
