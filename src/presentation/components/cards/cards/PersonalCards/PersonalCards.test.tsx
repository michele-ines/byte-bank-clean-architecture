import type { DefaultButtonProps, SvgMockProps } from "@/shared/interfaces/auth.interfaces";
import type { ConfirmModalProps } from "@/shared/ProfileStyles/profile.styles.types";
import { texts } from "@presentation/theme";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
import { Pressable, Text, View } from "react-native";
import PersonalCards from "./PersonalCards";

/** 🔹 Declarações globais fortemente tipadas */
declare global {
  var __mockToggle__: jest.MockedFunction<
    (type: string, currentState: string) => Promise<{ state: string }>
  >;
  var __impactAsync__: jest.MockedFunction<() => Promise<void>>;
  var __notificationAsync__: jest.MockedFunction<() => Promise<void>>;
}

/* ---------------------- 🔹 SVG mocks ---------------------- */
jest.mock("@/assets/images/dash-card-my-cards/cartao-fisico.svg", () => {
  const CartaoFisicoImg = (props: SvgMockProps): JSX.Element => (
    <View {...props} testID="CartaoFisicoImg" />
  );
  CartaoFisicoImg.displayName = "CartaoFisicoImgMock";
  return CartaoFisicoImg;
});

jest.mock("@/assets/images/dash-card-my-cards/cartao-digital.svg", () => {
  const CartaoDigitalImg = (props: SvgMockProps): JSX.Element => (
    <View {...props} testID="CartaoDigitalImg" />
  );
  CartaoDigitalImg.displayName = "CartaoDigitalImgMock";
  return CartaoDigitalImg;
});

/* ---------------------- 🔹 ConfirmModal mock ---------------------- */
jest.mock("@/src/components/common/ConfirmModal/ConfirmModal", () => {
  const ConfirmModal = ({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
  }: ConfirmModalProps): JSX.Element | null => {
    if (!visible) return null;
    return (
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
    );
  };
  ConfirmModal.displayName = "ConfirmModalMock";
  return ConfirmModal;
});

/* ---------------------- 🔹 DefaultButton mock ---------------------- */
jest.mock("@/src/components/common/DefaultButton/DefaultButton", () => {
  const DefaultButton = ({
    title,
    onPress,
    accessibilityLabel,
  }: DefaultButtonProps): JSX.Element => (
    <Pressable accessibilityLabel={accessibilityLabel} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
  DefaultButton.displayName = "DefaultButtonMock";
  return { DefaultButton };
});

/* ---------------------- 🔹 Mocks fortemente tipados ---------------------- */
interface ToggleResponse {
  state: string;
}

const mockToggle: jest.MockedFunction<
  (type: string, state: string) => Promise<ToggleResponse>
> = jest.fn((_type: string, state: string) => Promise.resolve({ state }));

const impactAsync: jest.MockedFunction<() => Promise<void>> = jest.fn(() =>
  Promise.resolve()
);
const notificationAsync: jest.MockedFunction<() => Promise<void>> = jest.fn(() =>
  Promise.resolve()
);

/* ---------------------- 🔹 Mock seguro de módulos ---------------------- */
jest.mock("@/src/OtherServices/cards", () => ({
  apiToggleCardState: (type: string, state: string): Promise<ToggleResponse> =>
    globalThis.__mockToggle__(type, state),
}));

jest.mock("expo-haptics", () => ({
  impactAsync: (): Promise<void> => globalThis.__impactAsync__(),
  notificationAsync: (): Promise<void> => globalThis.__notificationAsync__(),
  ImpactFeedbackStyle: { Medium: "medium" },
  NotificationFeedbackType: { Error: "error", Success: "success" },
}));

/* ---------------------- 🔹 Setup antes dos testes ---------------------- */
beforeEach((): void => {
  globalThis.__mockToggle__ = mockToggle;
  globalThis.__impactAsync__ = impactAsync;
  globalThis.__notificationAsync__ = notificationAsync;
  jest.clearAllMocks();
});

/* ---------------------- 🔹 Função utilitária de erro segura ---------------------- */
// ✅ retorna string segura ou objeto tipado — sem retornar Error diretamente
function createApiError(message: string): { message: string } {
  return { message };
}

/* ---------------------- 🔹 Testes ---------------------- */
describe("PersonalCards", () => {
  it("renderiza os dois painéis (Físico e Digital)", () => {
    const { getByText, getAllByText } = render(<PersonalCards />);
    expect(getByText(texts.textCartaoFisico)).toBeTruthy();
    expect(getByText(texts.textCartaoDigital)).toBeTruthy();
    expect(getAllByText(texts.textAtivo)).toHaveLength(2);
  });

  it("abre o modal ao clicar em Bloquear Cartão Físico", async () => {
    const { getByLabelText, getByTestId, getByText } = render(<PersonalCards />);
    fireEvent.press(getByLabelText(`${texts.textBloquear} ${texts.textCartaoFisico}`));
    const modal = await waitFor(() => getByTestId("ConfirmModal"));
    expect(modal).toBeTruthy();
    expect(getByText(texts.textBloquearCartao)).toBeTruthy();
    expect(getByText(texts.textMsgBloqueio)).toBeTruthy();
  });

  it("confirma bloqueio do cartão físico e chama API", async () => {
    mockToggle.mockResolvedValueOnce({ state: "blocked" });
    const { getByLabelText, getByTestId, getByText } = render(<PersonalCards />);
    fireEvent.press(getByLabelText(`${texts.textBloquear} ${texts.textCartaoFisico}`));
    await waitFor(() => getByTestId("ConfirmModal"));
    fireEvent.press(getByLabelText("confirm"));
    await waitFor(() => expect(mockToggle).toHaveBeenCalledWith("fisico", "active"));
    expect(impactAsync).toHaveBeenCalledTimes(1);
    expect(notificationAsync).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(getByText(texts.textBloqueado)).toBeTruthy());
  });

  it("cancela ação no modal", async () => {
    const { getByLabelText, getByTestId, queryByTestId } = render(<PersonalCards />);
    fireEvent.press(getByLabelText(`${texts.textBloquear} ${texts.textCartaoFisico}`));
    await waitFor(() => getByTestId("ConfirmModal"));
    fireEvent.press(getByLabelText("cancel"));
    await waitFor(() => expect(queryByTestId("ConfirmModal")).toBeNull());
  });

  it("bloqueia e depois desbloqueia o cartão digital", async () => {
    mockToggle.mockResolvedValueOnce({ state: "blocked" });
    mockToggle.mockResolvedValueOnce({ state: "active" });

    const { getByLabelText, getByTestId, getByText } = render(<PersonalCards />);
    fireEvent.press(getByLabelText(`${texts.textBloquear} ${texts.textCartaoDigital}`));
    await waitFor(() => getByTestId("ConfirmModal"));
    fireEvent.press(getByLabelText("confirm"));
    await waitFor(() => expect(getByText(texts.textBloqueado)).toBeTruthy());

    fireEvent.press(getByLabelText(`${texts.textDesbloquear} ${texts.textCartaoDigital}`));
    await waitFor(() => getByTestId("ConfirmModal"));
    fireEvent.press(getByLabelText("confirm"));
    await waitFor(() => expect(getByText(texts.textAtivo)).toBeTruthy());
  });

  it("trata erro de API com segurança", async () => {
    // ✅ Agora o mock rejeita um objeto simples e seguro
    mockToggle.mockRejectedValueOnce(createApiError("API error"));

    const { getByLabelText, getByTestId } = render(<PersonalCards />);
    fireEvent.press(getByLabelText(`${texts.textBloquear} ${texts.textCartaoFisico}`));
    await waitFor(() => getByTestId("ConfirmModal"));
    fireEvent.press(getByLabelText("confirm"));

    await waitFor(() => expect(mockToggle).toHaveBeenCalled());
  });
});
