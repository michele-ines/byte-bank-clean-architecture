import { db } from "@/src/config/firebaseConfig";
import { formTexts } from "@/src/constants/MinhaConta";
import { showToast } from "@/src/utils/toast";
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
          formTexts.toasts.error.generic.title,
          error.message || formTexts.toasts.error.generic.message
        );
      } else {
        showToast(
          "error",
          formTexts.toasts.error.generic.title,
          formTexts.toasts.error.generic.message
        );
      }
    }
  };

  const reauthenticate = async () => {
    if (!user?.email) {
      validateEmail("");
      return;
    }

    if (!currentPassword) {
      setError({
        field: "password",
        message: formTexts.toasts.error.reauth.message,
      });
      return;
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
        formTexts.toasts.success.name.title,
        formTexts.toasts.success.name.message
      );
      onClose();
    } catch (error) {
      const message =
        error instanceof FirebaseError
          ? error.message
          : formTexts.toasts.error.name.message;
      showToast("error", formTexts.toasts.error.name.title, message);
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
        message: formTexts.toasts.error.reauth.message,
      });
      return;
    }

    if (validateEmail(email)) {
      setError({ field: "email", message: validateEmail(email) });
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
      await reauthenticate();
      await updatePassword(user, newPassword);
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
          message = formTexts.toasts.error.weakPassword.message;
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
