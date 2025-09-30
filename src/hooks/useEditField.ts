import { db } from "@/src/config/firebaseConfig";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/src/utils/validation";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { texts } from "../theme";
import { showToast } from "../utils/transactions.utils";

export function useEditField(
  field: "name" | "email" | "password" | null,
  initialValue: string,
  onClose: () => void
) {
  const [value, setValue] = useState(initialValue);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    field: "",
    message: "",
  });

  const { user } = useAuth();

  const updateUserDataInFirestore = async (name?: string, email?: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        ...(name && { name }),
        ...(email && { email }),
        updatedAt: new Date(),
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        showToast(
          "error",
          texts.formToasts.error.generic.title,
          error.message || texts.formToasts.error.generic.message
        );
      } else {
        showToast(
          "error",
          texts.formToasts.error.generic.title,
          texts.formToasts.error.generic.message
        );
      }
    }
  };

  const reauthenticate = async () => {
    if (!user?.email) {
      validateEmail("");
      return false;
    }

    if (!currentPassword) {
      setError({
        field: "password",
        message: texts.formToasts.error.reauth.message,
      });
      return false;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/wrong-password") {
          setError({
            field: "currentPassword",
            message: texts.formToasts.error.reauthWrongPassword.message,
          });
        }
      }
      return false;
    }
  };

  const updateName = async (name: string) => {
    if (!user) return;

    if (name === user.displayName) {
      onClose();
      return;
    }

    if (validateName(name)) {
      setError({ field: "name", message: validateName(name) });
      return;
    }

    try {
      await updateProfile(user, { displayName: name });
      await updateUserDataInFirestore(name);
      showToast(
        "success",
        texts.formToasts.success.name.title,
        texts.formToasts.success.name.message
      );
      onClose();
    } catch (error) {
      const message =
        error instanceof FirebaseError
          ? error.message
          : texts.formToasts.error.name.message;
      showToast("error", texts.formToasts.error.name.title, message);
    }
  };

  const updateEmail = async (email: string) => {
    if (!user) return;

    if (email === user.email) {
      onClose();
      return;
    }

    if (!currentPassword) {
      setError({
        field: "currentPassword",
        message: texts.formToasts.error.reauth.message,
      });
      return;
    }

    if (validateEmail(email)) {
      setError({ field: "email", message: validateEmail(email) });
      return;
    }

    try {
      const reauthSuccess = await reauthenticate();
      if (!reauthSuccess) return;
      await verifyBeforeUpdateEmail(user, email);
      await updateUserDataInFirestore(undefined, email);
      showToast(
        "success",
        texts.formToasts.success.email.title,
        texts.formToasts.success.email.message
      );
      onClose();
    } catch (error) {
      let message = texts.formToasts.error.email.message;

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            message = texts.formToasts.error.emailInUse.message;
            break;
          case "auth/invalid-email":
            message = texts.formToasts.error.invalidEmail.message;
            break;
        }
      }
      showToast("error", texts.formToasts.error.email.title, message);
    }
  };

  const updateUserPassword = async (newPassword: string) => {
    if (!user) return;

    if (validatePassword(currentPassword)) {
      setError({
        field: "currentPassword",
        message: validatePassword(currentPassword),
      });
      return;
    }

    if (validatePassword(newPassword)) {
      setError({
        field: "newPassword",
        message: validatePassword(newPassword),
      });
      return;
    }

    try {
      const reauthSuccess = await reauthenticate();
      if (!reauthSuccess) return;
      await updatePassword(user, newPassword);
      showToast(
        "success",
        texts.formToasts.success.password.title,
        texts.formToasts.success.password.message
      );
      onClose();
    } catch (error) {
      let message = texts.formToasts.error.password.message;
      let title = texts.formToasts.error.password.title;

      if (error instanceof Error) {
        if (error.message.includes("auth/wrong-password")) {
          title = texts.formToasts.error.reauth.title;
          message = texts.formToasts.error.reauth.message;
        } else if (error.message.includes("auth/weak-password")) {
          message = texts.formToasts.error.weakPassword.message;
        } else {
          message = error.message;
        }
      }

      showToast("error", title, message);
    }
  };

  return {
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
  };
}
