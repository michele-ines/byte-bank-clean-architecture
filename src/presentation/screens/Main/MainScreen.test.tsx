import { useDI } from "@presentation/providers/di";
import { useAuth } from "@presentation/state/AuthContext";
import { useTransactions } from "@presentation/state/TransactionsContext";
import { ROUTES } from "@shared/constants/routes";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import MainScreen from "./MainScreen";

jest.mock("@presentation/state/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@presentation/state/TransactionsContext", () => ({
  useTransactions: jest.fn(),
}));

jest.mock("@presentation/providers/di", () => ({
  useDI: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

jest.mock("@react-navigation/native", () => {

  const actualNav: Record<string, unknown> = jest.requireActual("@react-navigation/native");

  const useNavigation = (): {
    navigate: jest.Mock;
    goBack: jest.Mock;
    openDrawer: jest.Mock;
  } => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    openDrawer: jest.fn(),
  });

  return {
    ...actualNav,
    useNavigation,
  };
});


jest.mock("@presentation/layout/Header/Header", () => ({
  Header: () => null,
}));

jest.mock("@presentation/layout/Footer/Footer", () => ({
  Footer: () => null,
}));

jest.mock("@assets/images/page/banner-ilustracao.svg", () => "SvgMock");
jest.mock("@assets/images/page/icon-dispositivos.svg", () => "SvgMock");
jest.mock("@assets/images/page/icon-pontos.svg", () => "SvgMock");
jest.mock("@assets/images/page/icon-presente.svg", () => "SvgMock");
jest.mock("@assets/images/page/icon-saque.svg", () => "SvgMock");

describe("MainScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: { email: "teste@exemplo.com" },
    });

    (useTransactions as jest.Mock).mockReturnValue({
      transactions: [],
      loading: false,
    });

    (useDI as jest.Mock).mockReturnValue({
      createTransaction: jest.fn(),
      listUserTransactions: jest.fn(),
    });
  });

  it("renderiza corretamente o conteúdo principal", async () => {
    const { getByText } = render(<MainScreen />);

    await waitFor(() => {
      expect(
        getByText("Experimente mais liberdade no controle da sua vida financeira.")
      ).toBeTruthy();
      expect(getByText("Crie sua conta com a gente!")).toBeTruthy();
      expect(getByText("Abrir conta")).toBeTruthy();
      expect(getByText("Já tenho conta")).toBeTruthy();
      expect(getByText("Vantagens do nosso banco:")).toBeTruthy();
    });
  });

  it("navega para SIGNUP ao clicar em 'Abrir conta'", () => {
    const { getByText } = render(<MainScreen />);
    fireEvent.press(getByText("Abrir conta"));
    expect(router.push).toHaveBeenCalledWith(ROUTES.SIGNUP);
  });

  it("navega para LOGIN ao clicar em 'Já tenho conta'", () => {
    const { getByText } = render(<MainScreen />);
    fireEvent.press(getByText("Já tenho conta"));
    expect(router.push).toHaveBeenCalledWith(ROUTES.LOGIN);
  });
});

describe("MainScreen (smoke)", () => {
  it("monta sem erros", () => {
    const { toJSON } = render(<MainScreen />);
    expect(toJSON()).toBeTruthy();
  });
});

describe("ROUTES (sanidade)", () => {
  it("confirma que as rotas públicas estão corretas", () => {
    expect(ROUTES.SIGNUP).toBe("/(public)/cadastro/CadastroPage");
    expect(ROUTES.LOGIN).toBe("/(public)/login/LoginPage");
  });
});
