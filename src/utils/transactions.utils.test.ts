import Toast from "react-native-toast-message";
import { formatTransactionDescription, showToast } from "./transactions.utils";

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

describe("formatTransactionDescription", () => {
  it("Deve formatar a descrição com tipo e valor em maiúsculas", () => {
    expect(formatTransactionDescription("deposito", 1234.56)).toBe(
      "Deposito - R$ 1234,56"
    );
    expect(formatTransactionDescription("saque", 10)).toBe("Saque - R$ 10,00");
    expect(formatTransactionDescription("PIX", 0.5)).toBe("PIX - R$ 0,50");
  });
});

describe("showToast", () => {
  it("Deve chamar Toast.show com os parâmetros corretos", () => {
    const spy = jest.spyOn(Toast, "show").mockImplementation(() => {});
    showToast("success", "Título", "Mensagem");
    expect(spy).toHaveBeenCalledWith({
      type: "success",
      text1: "Título",
      text2: "Mensagem",
    });
    spy.mockRestore();
  });
});
