import { formTexts } from "../constants/MinhaConta";

export const validateEmail = (text: string): string => {
  if (text.length === 0) {
    return formTexts.toasts.error.emailRequired.message;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(text) && text.length > 0) {
    return formTexts.toasts.error.invalidEmail.message;
  } else {
    return "";
  }
};

export const validatePassword = (password: string): string => {
  if (password.length === 0) {
    return formTexts.toasts.error.passwordRequired.message;
  }

  if (password.length < 8) {
    return formTexts.toasts.error.weakPassword.message;
  }

  return "";
};

export const validateName = (name: string): string => {
  const nameTrimmed = name.trim();

  if (nameTrimmed.length === 0) {
    return formTexts.toasts.error.nameRequired.message;
  }

  if (nameTrimmed.length < 2) {
    return formTexts.toasts.error.nameTooShort.message;
  }

  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  if (!regex.test(nameTrimmed)) {
    return formTexts.toasts.error.nameInvalid.message;
  }

  return "";
};
