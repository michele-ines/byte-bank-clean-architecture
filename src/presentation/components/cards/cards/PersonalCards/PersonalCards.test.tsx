import { texts } from "@presentation/theme";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import PersonalCards from "./PersonalCards";

jest.mock("@/assets/images/dash-card-my-cards/cartao-fisico.svg", () => {
  const React = require("react");
  const { View } = require("react-native");
  return (props: any) => <View {...props} testID="CartaoFisicoImg" />;
});

jest.mock("@/assets/images/dash-card-my-cards/cartao-digital.svg", () => {
  const React = require("react");
  const { View } = require("react-native");
  return (props: any) => <View {...props} testID="CartaoDigitalImg" />;
});

jest.mock("@/src/components/common/ConfirmModal/ConfirmModal", () => {
  const React = require("react");
  const { View, Text, Pressable } = require("react-native");
  const ConfirmModal = ({ visible, title, message, onConfirm, onCancel }: any) =>
    visible ? (
      <View testID="ConfirmModal">
        <Text>{title}</Text>
        <Text>{message}</Text>
        <Pressable accessibilityLabel="confirm" onPress={onConfirm}>
          <Text>confirm</Text>
        </Pressable>
        <Pressable accessibilityLabel="cancel" onPress={onCancel}>
          <Text>cancel</Text>
        </Pressable>
      </View>
    ) : null;
  return ConfirmModal;
});

jest.mock("@/src/components/common/DefaultButton/DefaultButton", () => {
  const React = require("react");
  const { Pressable, Text } = require("react-native");
  const DefaultButton = ({ title, onPress, accessibilityLabel }: any) => (
    <Pressable accessibilityLabel={accessibilityLabel} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
  return { DefaultButton };
});

const mockToggle = jest.fn();
jest.mock("@/src/OtherServices/cards", () => ({
  apiToggleCardState: (...args: any[]) =>
    (global as any).__mockToggle__(...args),
}));

const impactAsync = jest.fn();
const notificationAsync = jest.fn();
jest.mock("expo-haptics", () => ({
  impactAsync: (...args: any[]) => (global as any).__impactAsync__(...args),
  notificationAsync: (...args: any[]) =>
    (global as any).__notificationAsync__(...args),
  ImpactFeedbackStyle: { Medium: "medium" },
  NotificationFeedbackType: { Error: "error", Success: "success" },
}));

beforeEach(() => {
  (global as any).__mockToggle__ = mockToggle;
  (global as any).__impactAsync__ = impactAsync;
  (global as any).__notificationAsync__ = notificationAsync;
  jest.clearAllMocks();
});

describe("PersonalCards", () => {
  it("renderiza os dois painéis (Físico e Digital)", () => {
    const { getByText, getAllByText } = render(<PersonalCards />);

    expect(getByText(texts.textCartaoFisico)).toBeTruthy();
    expect(getByText(texts.textCartaoDigital)).toBeTruthy();

    const ativos = getAllByText(texts.textAtivo);
    expect(ativos).toHaveLength(2);
  });

  it("abre o modal ao clicar em Bloquear Cartão Físico", async () => {
    const { getByLabelText, getByTestId, getByText } = render(<PersonalCards />);

    fireEvent.press(
      getByLabelText(`${texts.textBloquear} ${texts.textCartaoFisico}`)
    );

    const modal = await waitFor(() => getByTestId("ConfirmModal"));
    expect(modal).toBeTruthy();
    expect(getByText(texts.textBloquearCartao)).toBeTruthy();
    expect(getByText(texts.textMsgBloqueio)).toBeTruthy();
  });

  it("confirma bloqueio do cartão físico e chama API", async () => {
    mockToggle.mockResolvedValueOnce({ state: "blocked" });

    const { getByLabelText, getByTestId, getByText } = render(<PersonalCards />);

    fireEvent.press(
      getByLabelText(`${texts.textBloquear} ${texts.textCartaoFisico}`)
    );

    await waitFor(() => getByTestId("ConfirmModal"));
    fireEvent.press(getByLabelText("confirm"));

    await waitFor(() => {
      expect(mockToggle).toHaveBeenCalledWith("fisico", "active");
    });

    expect(impactAsync).toHaveBeenCalled();
    expect(notificationAsync).toHaveBeenCalled();

    await waitFor(() => {
      expect(getByText(texts.textBloqueado)).toBeTruthy();
    });
  });

  it("cancela ação no modal", async () => {
    const { getByLabelText, getByTestId, queryByTestId } = render(<PersonalCards />);

    fireEvent.press(
      getByLabelText(`${texts.textBloquear} ${texts.textCartaoFisico}`)
    );

    await waitFor(() => getByTestId("ConfirmModal"));
    fireEvent.press(getByLabelText("cancel"));

    await waitFor(() => {
      expect(queryByTestId("ConfirmModal")).toBeNull();
    });
  });

  it("bloqueia e depois desbloqueia o cartão digital", async () => {
    mockToggle.mockResolvedValueOnce({ state: "blocked" });
    mockToggle.mockResolvedValueOnce({ state: "active" });

    const { getByLabelText, getByTestId, getByText } = render(<PersonalCards />);

    fireEvent.press(
      getByLabelText(`${texts.textBloquear} ${texts.textCartaoDigital}`)
    );
    await waitFor(() => getByTestId("ConfirmModal"));
    fireEvent.press(getByLabelText("confirm"));
    await waitFor(() => {
      expect(getByText(texts.textBloqueado)).toBeTruthy();
    });

    fireEvent.press(
      getByLabelText(`${texts.textDesbloquear} ${texts.textCartaoDigital}`)
    );
    await waitFor(() => getByTestId("ConfirmModal"));
    fireEvent.press(getByLabelText("confirm"));
    await waitFor(() => {
      expect(getByText(texts.textAtivo)).toBeTruthy();
    });
  });
});
