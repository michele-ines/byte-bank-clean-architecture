import { texts } from "@presentation/theme";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import ConfirmModal from "./ConfirmModal";

describe("ConfirmModal", () => {
  const baseProps = {
    visible: true,
    title: "Confirmação",
    message: "Deseja realmente continuar?",
    confirmText: "Sim",
    cancelText: "Não",
    isDestructive: false,
    loading: false,
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  it("renderiza título e mensagem", () => {
    const { getByText } = render(<ConfirmModal {...baseProps} />);
    expect(getByText("Confirmação")).toBeTruthy();
    expect(getByText("Deseja realmente continuar?")).toBeTruthy();
  });

  it("renderiza botões de cancelar e confirmar", () => {
    const { getByText } = render(<ConfirmModal {...baseProps} />);
    expect(getByText("Não")).toBeTruthy();
    expect(getByText("Sim")).toBeTruthy();
  });

  it("chama onCancel ao clicar em Cancelar", () => {
    const onCancel = jest.fn();
    const { getByLabelText } = render(
      <ConfirmModal {...baseProps} onCancel={onCancel} />
    );
    fireEvent.press(getByLabelText("Não"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("chama onConfirm ao clicar em Confirmar", () => {
    const onConfirm = jest.fn();
    const { getByLabelText } = render(
      <ConfirmModal {...baseProps} onConfirm={onConfirm} />
    );
    fireEvent.press(getByLabelText("Sim"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("desabilita botão confirmar quando loading=true", () => {
    const { getByLabelText } = render(
      <ConfirmModal {...baseProps} loading={true} />
    );
    const confirmButton = getByLabelText("Sim");
    expect(confirmButton.props.accessibilityState.disabled).toBe(true);
  });

  it("não renderiza nada quando visible=false", () => {
    const { queryByText } = render(<ConfirmModal {...baseProps} visible={false} />);
    expect(queryByText("Confirmação")).toBeNull();
  });

  it("usa textos padrão se confirmText e cancelText não forem passados", () => {
    const { getByLabelText } = render(
      <ConfirmModal
        {...baseProps}
        confirmText={undefined as any}
        cancelText={undefined as any}
      />
    );
    expect(getByLabelText(texts.textConfirmar)).toBeTruthy();
    expect(getByLabelText(texts.textCancelar)).toBeTruthy();
  });
});
