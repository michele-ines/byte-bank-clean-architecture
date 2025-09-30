import { texts } from "../theme";

export const validateEmail = (text: string): string => {
  if (text.length === 0) {
    return texts.formToasts.error.emailRequired.message;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(text) && text.length > 0) {
    return texts.formToasts.error.invalidEmail.message;
  }

  return "";
};

export const validatePassword = (password: string): string => {
  if (password.length === 0) {
    return texts.formToasts.error.passwordRequired.message;
  }

  if (password.length < 8) {
    return texts.formToasts.error.weakPassword.message;
  }

  return "";
};

export const validateName = (name: string): string => {
  const nameTrimmed = name.trim();

  if (nameTrimmed.length === 0) {
    return texts.formToasts.error.nameRequired.message;
  }

  if (nameTrimmed.length < 2) {
    return texts.formToasts.error.nameTooShort.message;
  }

  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  if (!regex.test(nameTrimmed)) {
    return texts.formToasts.error.nameInvalid.message;
  }

  return "";
};
