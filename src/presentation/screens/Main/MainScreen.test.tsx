import { fireEvent, render, screen } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import MainScreen from "./MainScreen";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@/src/shared/Header/Header", () => {
  const { Text } = require("react-native");
  return { Header: () => <Text testID="mock-header">Header</Text> };
});
jest.mock("@/src/shared/Footer/Footer", () => {
  const { Text } = require("react-native");
  return { Footer: () => <Text testID="mock-footer">Footer</Text> };
});

jest.mock("@/src/components/common/DefaultButton/DefaultButton", () => {
  const { Text, TouchableOpacity } = require("react-native");
  return {
    DefaultButton: ({ title, onPress }: any) => (
      <TouchableOpacity onPress={onPress} testID={`btn-${title}`}>
        <Text>{title}</Text>
      </TouchableOpacity>
    ),
  };
});

jest.mock("@/assets/images/page/banner-ilustracao.svg", () => {
  const { Text } = require("react-native");
  return () => <Text testID="banner-svg">Banner</Text>;
});
jest.mock("@/assets/images/page/icon-dispositivos.svg", () => {
  const { Text } = require("react-native");
  return () => <Text testID="icon-dispositivos">IconDispositivos</Text>;
});
jest.mock("@/assets/images/page/icon-pontos.svg", () => {
  const { Text } = require("react-native");
  return () => <Text testID="icon-pontos">IconPontos</Text>;
});
jest.mock("@/assets/images/page/icon-presente.svg", () => {
  const { Text } = require("react-native");
  return () => <Text testID="icon-presente">IconPresente</Text>;
});
jest.mock("@/assets/images/page/icon-saque.svg", () => {
  const { Text } = require("react-native");
  return () => <Text testID="icon-saque">IconSaque</Text>;
});

describe("MainScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza Header, Footer e hero section", () => {
    render(<MainScreen />);

    expect(screen.getByTestId("mock-header")).toBeTruthy();
    expect(
      screen.getByText("Experimente mais liberdade no controle da sua vida financeira.")
    ).toBeTruthy();
    expect(screen.getByText("Crie sua conta com a gente!")).toBeTruthy();
    expect(screen.getByTestId("banner-svg")).toBeTruthy();
    expect(screen.getByTestId("mock-footer")).toBeTruthy();
  });

  it("renderiza botões Abrir conta e Já tenho conta", () => {
    render(<MainScreen />);
    expect(screen.getByTestId("btn-Abrir conta")).toBeTruthy();
    expect(screen.getByTestId("btn-Já tenho conta")).toBeTruthy();
  });

  it("navega corretamente ao clicar nos botões", () => {
    render(<MainScreen />);
    fireEvent.press(screen.getByTestId("btn-Abrir conta"));
    expect(router.push).toHaveBeenCalledWith("/(public)/cadastro/CadastroPage");

    fireEvent.press(screen.getByTestId("btn-Já tenho conta"));
    expect(router.push).toHaveBeenCalledWith("/(public)/login/LoginPage");
  });

  it("renderiza todas as FeatureCards", () => {
    render(<MainScreen />);
    expect(screen.getByTestId("icon-presente")).toBeTruthy();
    expect(screen.getByTestId("icon-saque")).toBeTruthy();
    expect(screen.getByTestId("icon-pontos")).toBeTruthy();
    expect(screen.getByTestId("icon-dispositivos")).toBeTruthy();
  });
});
