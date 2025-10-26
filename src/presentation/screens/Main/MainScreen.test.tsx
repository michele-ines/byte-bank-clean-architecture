import { fireEvent, render, screen } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import MainScreen from "./MainScreen";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@/src/shared/Header/Header", () => ({
  Header: () => <Text testID="mock-header">Header</Text>,
}));
(Object.assign(jest.requireMock("@/src/shared/Header/Header"), {
  displayName: "MockHeader",
}));

jest.mock("@/src/shared/Footer/Footer", () => ({
  Footer: () => <Text testID="mock-footer">Footer</Text>,
}));
(Object.assign(jest.requireMock("@/src/shared/Footer/Footer"), {
  displayName: "MockFooter",
}));

jest.mock("@/src/components/common/DefaultButton/DefaultButton", () => ({
  DefaultButton: ({ title, onPress }: any) => (
    <TouchableOpacity onPress={onPress} testID={`btn-${title}`}>
      <Text>{title}</Text>
    </TouchableOpacity>
  ),
}));
(Object.assign(
  jest.requireMock("@/src/components/common/DefaultButton/DefaultButton"),
  { displayName: "MockDefaultButton" }
));

jest.mock("@/assets/images/page/banner-ilustracao.svg", () => ({
  __esModule: true,
  default: () => <Text testID="banner-svg">Banner</Text>,
}));
(Object.assign(
  jest.requireMock("@/assets/images/page/banner-ilustracao.svg"),
  { displayName: "MockBannerSvg" }
));

jest.mock("@/assets/images/page/icon-dispositivos.svg", () => ({
  __esModule: true,
  default: () => <Text testID="icon-dispositivos">IconDispositivos</Text>,
}));
(Object.assign(
  jest.requireMock("@/assets/images/page/icon-dispositivos.svg"),
  { displayName: "MockIconDispositivos" }
));

jest.mock("@/assets/images/page/icon-pontos.svg", () => ({
  __esModule: true,
  default: () => <Text testID="icon-pontos">IconPontos</Text>,
}));
(Object.assign(
  jest.requireMock("@/assets/images/page/icon-pontos.svg"),
  { displayName: "MockIconPontos" }
));

jest.mock("@/assets/images/page/icon-presente.svg", () => ({
  __esModule: true,
  default: () => <Text testID="icon-presente">IconPresente</Text>,
}));
(Object.assign(
  jest.requireMock("@/assets/images/page/icon-presente.svg"),
  { displayName: "MockIconPresente" }
));

jest.mock("@/assets/images/page/icon-saque.svg", () => ({
  __esModule: true,
  default: () => <Text testID="icon-saque">IconSaque</Text>,
}));
(Object.assign(
  jest.requireMock("@/assets/images/page/icon-saque.svg"),
  { displayName: "MockIconSaque" }
));

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
