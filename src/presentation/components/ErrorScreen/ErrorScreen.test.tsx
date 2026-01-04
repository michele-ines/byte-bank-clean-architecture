import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { ErrorScreen } from "./ErrorScreen";

describe("ErrorScreen", () => {
  it("renderiza título e mensagem padrão", () => {
    const { getByText } = render(<ErrorScreen onRetry={jest.fn()} />);

    expect(getByText("Ocorreu um erro")).toBeTruthy();
    expect(getByText("Algo deu errado. Tente novamente.")).toBeTruthy();
    expect(getByText("Tente novamente")).toBeTruthy();
  });

  it("renderiza título e mensagem customizados", () => {
    const { getByText } = render(
      <ErrorScreen
        title="Erro Customizado"
        message="Mensagem de erro customizada"
        onRetry={jest.fn()}
      />
    );

    expect(getByText("Erro Customizado")).toBeTruthy();
    expect(getByText("Mensagem de erro customizada")).toBeTruthy();
  });

  it("chama onRetry ao clicar no botão", () => {
    const onRetry = jest.fn();
    const { getByLabelText } = render(<ErrorScreen onRetry={onRetry} />);

    fireEvent.press(getByLabelText("Tentar novamente"));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
