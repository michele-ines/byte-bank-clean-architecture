import type { DefaultButtonProps, SvgMockProps } from "@/domain/interfaces/auth.interfaces";
import type { ConfirmModalProps } from "@/shared/ProfileStyles/profile.styles.types";
import { texts } from "@presentation/theme";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
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
jest.mock("@assets/images/dash-card-my-cards/cartao-fisico.svg", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown; Pressable: unknown }>("react-native");
  const mockView = reactNative.View;
  const CartaoFisicoImg = (props: SvgMockProps): JSX.Element =>
    mockReact.createElement(mockView, { ...props, testID: "CartaoFisicoImg" });

  (CartaoFisicoImg as React.FC).displayName = "CartaoFisicoImgMock";
  return { __esModule: true, default: CartaoFisicoImg };
});

jest.mock("@assets/images/dash-card-my-cards/cartao-digital.svg", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown; Pressable: unknown }>("react-native");
  const mockView = reactNative.View;
  const CartaoDigitalImg = (props: SvgMockProps): JSX.Element =>
    mockReact.createElement(mockView, { ...props, testID: "CartaoDigitalImg" });

  (CartaoDigitalImg as React.FC).displayName = "CartaoDigitalImgMock";
  return { __esModule: true, default: CartaoDigitalImg };
});

/* ---------------------- 🔹 ConfirmModal mock ---------------------- */
jest.mock("@presentation/components/common/common/ConfirmModal/ConfirmModal", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown; Pressable: unknown }>("react-native");
  const mockView = reactNative.View;
  const mockText = reactNative.Text;
  const mockPressable = reactNative.Pressable;
  const ConfirmModal = ({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
  }: ConfirmModalProps): JSX.Element | null => {
    if (!visible) return null;
    return mockReact.createElement(
      mockView,
      { testID: "ConfirmModal" },
      mockReact.createElement(mockText, null, title),
      mockReact.createElement(mockText, null, message),
      mockReact.createElement(
        mockPressable,
        { accessibilityLabel: "confirm", onPress: onConfirm },
        mockReact.createElement(mockText, null, "confirm")
      ),
      mockReact.createElement(
        mockPressable,
        { accessibilityLabel: "cancel", onPress: onCancel },
        mockReact.createElement(mockText, null, "cancel")
      )
    );
  };
  (ConfirmModal as React.FC).displayName = "ConfirmModalMock";
  return { __esModule: true, default: ConfirmModal };
});

/* ---------------------- 🔹 DefaultButton mock ---------------------- */
jest.mock("@presentation/components/common/common/DefaultButton/DefaultButton", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown; Pressable: unknown }>("react-native");
  const mockPressable = reactNative.Pressable;
  const mockText = reactNative.Text;
  const DefaultButton = ({
    title,
    onPress,
    accessibilityLabel,
  }: DefaultButtonProps): JSX.Element =>
    mockReact.createElement(
      mockPressable,
      { accessibilityLabel, onPress },
      mockReact.createElement(mockText, null, title)
    );

  (DefaultButton as React.FC).displayName = "DefaultButtonMock";
  return { __esModule: true, DefaultButton };
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
jest.mock("@presentation/screens/OtherServices/cards", () => ({
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
