import { texts } from "@presentation/theme";
import { validateEmail, validateName, validatePassword } from "./validation";

describe("validateEmail", () => {
  it("Deve exigir email", () => {
    expect(validateEmail("")).toBe(texts.formToasts.error.emailRequired.message);
  });

  it("Deve retornar erro para email inválido", () => {
    expect(validateEmail("invalid-email")).toBe(
      texts.formToasts.error.invalidEmail.message
    );
  });

  it("Deve retornar string vazia para email válido", () => {
    expect(validateEmail("test@example.com")).toBe(""); 
  });
});

describe("validatePassword", () => {
  it("Deve exigir senha", () => {
    expect(validatePassword("")).toBe(
      texts.formToasts.error.passwordRequired.message
    );
  });

  it("Deve retornar erro para senha fraca (menos de 8, sem maiúscula/minúscula/número)", () => {
    expect(validatePassword("A1bCdeF")).toBe( 
      texts.formToasts.error.weakPassword.message
    );
    expect(validatePassword("MinhaSenha")).toBe( 
      texts.formToasts.error.weakPassword.message
    );
  });

  it("Deve retornar string vazia para senha forte", () => {
    expect(validatePassword("Password123")).toBe(""); 
  });
});

describe("validateName", () => {
  it("Deve exigir nome", () => {
    expect(validateName("")).toBe(texts.formToasts.error.nameRequired.message);
  });

  it("Deve retornar erro para nome muito curto", () => {
    expect(validateName("a")).toBe(texts.formToasts.error.nameTooShort.message);
  });

  it("Deve retornar erro para nome com caracteres especiais", () => {
    expect(validateName("Nome@Invalido")).toBe(
      texts.formToasts.error.nameInvalid.message
    );
  });

  it("Deve retornar string vazia para nome válido", () => {
    expect(validateName("Nome Completo")).toBe("");
  });
});