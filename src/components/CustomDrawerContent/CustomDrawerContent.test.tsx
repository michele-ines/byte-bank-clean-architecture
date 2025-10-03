import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { CustomDrawerContent } from "./CustomDrawerContent";

// mock do AuthContext
jest.mock("@/src/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// mock DrawerItemList (senão o Drawer tenta renderizar de verdade)
jest.mock("@react-navigation/drawer", () => {
  return {
    DrawerContentScrollView: ({ children }: any) => <>{children}</>,
    DrawerItemList: jest.fn(() => <></>),
  };
});

import { useAuth } from "@/src/contexts/AuthContext";

describe("CustomDrawerContent", () => {
  const mockSignOut = jest.fn();

  const baseProps: any = {
    state: { routes: [] },
    navigation: { navigate: jest.fn() },
    descriptors: {},
  };

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

    // Nome e email
    expect(getByText("João Teste")).toBeTruthy();
    expect(getByText("teste@example.com")).toBeTruthy();

    // Iniciais
    expect(getByText("JT")).toBeTruthy();

    // Avatar acessível
    expect(getByLabelText("Avatar de João Teste")).toBeTruthy();
  });

  it("usa fallback quando não há userData", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: "fulano@dominio.com" },
      userData: null,
      signOut: mockSignOut,
    });

    const { getByText } = render(<CustomDrawerContent {...baseProps} />);

    expect(getByText("fulano")).toBeTruthy(); // displayName derivado do email
    expect(getByText("fulano@dominio.com")).toBeTruthy();
    expect(getByText("F")).toBeTruthy(); // inicial
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
