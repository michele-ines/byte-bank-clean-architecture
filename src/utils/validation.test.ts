import { texts } from "../theme";
import { validateEmail, validateName, validatePassword } from "./validation";

describe("validateEmail", () => {
  it("Deve exigir e-mail", () => {
    expect(validateEmail("")).toBe(
      texts.formToasts.error.emailRequired.message
    );
  });
  it("Deve validar e-mail inválido", () => {
    expect(validateEmail("invalid-email")).toBe(
      texts.formToasts.error.invalidEmail.message
    );
    expect(validateEmail("test@")).toBe(
      texts.formToasts.error.invalidEmail.message
    );
    expect(validateEmail("test@domain")).toBe(
      texts.formToasts.error.invalidEmail.message
    );
  });
  it("Deve aceitar e-mails válidos", () => {
    expect(validateEmail("test@example.com")).toBe("");
  });
});

describe("validatePassword", () => {
  it("Deve exigir senha", () => {
    expect(validatePassword("")).toBe(
      texts.formToasts.error.passwordRequired.message
    );
  });
  it("Deve validar senha fraca", () => {
    expect(validatePassword("1234567")).toBe(
      texts.formToasts.error.weakPassword.message
    );
  });
  it("Deve aceitar senhas fortes", () => {
    expect(validatePassword("12345678")).toBe("");
    expect(validatePassword("password123")).toBe("");
  });
});

describe("validateName", () => {
  it("Deve exigir nome", () => {
    expect(validateName("")).toBe(texts.formToasts.error.nameRequired.message);
    expect(validateName("   ")).toBe(
      texts.formToasts.error.nameRequired.message
    );
  });
  it("Deve validar nome curto", () => {
    expect(validateName("A")).toBe(texts.formToasts.error.nameTooShort.message);
  });
  it("Deve validar nome inválido", () => {
    expect(validateName("123")).toBe(
      texts.formToasts.error.nameInvalid.message
    );
    expect(validateName("John@Doe")).toBe(
      texts.formToasts.error.nameInvalid.message
    );
    expect(validateName("John_Doe")).toBe(
      texts.formToasts.error.nameInvalid.message
    );
  });
  it("Deve aceitar nomes válidos", () => {
    expect(validateName("João")).toBe("");
    expect(validateName("Maria Silva")).toBe("");
    expect(validateName("Élise Dupont")).toBe("");
  });
});
