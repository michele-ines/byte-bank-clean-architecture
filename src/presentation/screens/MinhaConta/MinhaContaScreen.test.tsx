import { render, screen } from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
import MyAccountPage from "./MinhaContaScreen";

// ✅ Adicionado tipo de retorno explícito : JSX.Element
jest.mock("@assets/images/dash-card-my-account/card-pixels-3.svg", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ Text: unknown }>("react-native");
  const mockText = reactNative.Text;
  const CardPixel3 = (): JSX.Element =>
    mockReact.createElement(mockText, { testID: "card-pixel-3" }, "CardPixel3");
  CardPixel3.displayName = "CardPixel3";
  return CardPixel3;
});

jest.mock("@assets/images/dash-card-my-account/card-pixels-4.svg", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ Text: unknown }>("react-native");
  const mockText = reactNative.Text;
  const CardPixel4 = (): JSX.Element =>
    mockReact.createElement(mockText, { testID: "card-pixel-4" }, "CardPixel4");
  CardPixel4.displayName = "CardPixel4";
  return CardPixel4;
});

jest.mock("@assets/images/dash-card-my-account/ilustracao-card-accout.svg", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ Text: unknown }>("react-native");
  const mockText = reactNative.Text;
  const Illustration = (): JSX.Element =>
    mockReact.createElement(mockText, { testID: "illustration" }, "MyAccountIllustration");
  Illustration.displayName = "MyAccountIllustration";
  return Illustration;
});

jest.mock("@presentation/components/cards/CardMinhaConta/CardMinhaConta", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ Text: unknown }>("react-native");
  const mockText = reactNative.Text;
  const CardMinhaConta = (): JSX.Element =>
    mockReact.createElement(mockText, { testID: "card-minha-conta" }, "CardMinhaConta");
  CardMinhaConta.displayName = "CardMinhaConta";
  return { CardMinhaConta };
});

describe("MyAccountPage", () => {
  it("renderiza os elementos principais", (): void => {
    render(<MyAccountPage />);

    expect(screen.getByTestId("card-pixel-3")).toBeTruthy();
    expect(screen.getByTestId("card-pixel-4")).toBeTruthy();
    expect(screen.getByTestId("illustration")).toBeTruthy();
    expect(screen.getByTestId("card-minha-conta")).toBeTruthy();
  });
});
