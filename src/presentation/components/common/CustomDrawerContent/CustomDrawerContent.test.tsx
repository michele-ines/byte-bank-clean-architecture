import { useAuth } from "@presentation/state/AuthContext";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { CustomDrawerContent } from "./CustomDrawerContent";

jest.mock("@presentation/state/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@react-navigation/drawer", () => {
  return {
    DrawerContentScrollView: ({
      children,
    }: React.PropsWithChildren<Partial<DrawerContentComponentProps>>) => (
      <>{children}</>
    ),
    DrawerItemList: jest.fn(() => <></>),
  };
});

describe("CustomDrawerContent", () => {
  const mockSignOut = jest.fn();

  const baseProps = {
    state: { routes: [] },
    navigation: { navigate: jest.fn() },
    descriptors: {},
  } as unknown as DrawerContentComponentProps;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza nome, email e iniciais do usuário", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { displayName: "João Silva", email: "joao@example.com" },
      userData: { name: "João Teste", email: "teste@example.com" },
      signOut: mockSignOut,
    });

    const { getByText, getByLabelText } = render(
      <CustomDrawerContent {...baseProps} />
    );

    expect(getByText("João Teste")).toBeTruthy();
    expect(getByText("teste@example.com")).toBeTruthy();
    expect(getByText("JT")).toBeTruthy();
    expect(getByLabelText("Avatar de João Teste")).toBeTruthy();
  });

  it("usa fallback quando não há userData", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: "fulano@dominio.com" },
      userData: null,
      signOut: mockSignOut,
    });

    const { getByText } = render(<CustomDrawerContent {...baseProps} />);

    expect(getByText("fulano")).toBeTruthy();
    expect(getByText("fulano@dominio.com")).toBeTruthy();
    expect(getByText("F")).toBeTruthy();
  });

  it("chama signOut ao clicar no botão 'Sair'", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { displayName: "Maria" },
      userData: { name: "Maria Teste", email: "maria@example.com" },
      signOut: mockSignOut,
    });

    const { getByText } = render(<CustomDrawerContent {...baseProps} />);

    const btn = getByText("Sair");
    fireEvent.press(btn);

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
