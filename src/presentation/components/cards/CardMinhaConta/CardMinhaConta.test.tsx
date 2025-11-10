import { useAuth } from "@presentation/state/AuthContext";
import { fireEvent, render, screen } from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
import { CardMinhaConta } from "./CardMinhaConta";

jest.mock("@presentation/state/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ Text: unknown }>("react-native");
  const mockText = reactNative.Text;
  const MaterialIcons = (props: Record<string, unknown>): JSX.Element =>
    mockReact.createElement(mockText, { testID: "icon-mock", ...props }, "IconMock");

  return { MaterialIcons };
});

jest.mock("../../modal/EditFieldModal/EditFieldModal", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown; TouchableOpacity: unknown }>("react-native");
  const mockView = reactNative.View;
  const mockText = reactNative.Text;
  const mockTouchableOpacity = reactNative.TouchableOpacity;
  const MockModal = ({
    visible,
    field,
    initialValue,
    onClose,
  }: {
    visible: boolean;
    field: string;
    initialValue: string;
    onClose: () => void;
  }): JSX.Element | null =>
    visible
      ? mockReact.createElement(
          mockView,
          null,
          mockReact.createElement(mockText, { testID: "modal-field" }, field),
          mockReact.createElement(mockText, { testID: "modal-initial" }, initialValue),
          mockReact.createElement(mockText, { testID: "modal-visible" }, "true"),
          mockReact.createElement(
            mockTouchableOpacity,
            { testID: "modal-onClose", onPress: onClose },
            mockReact.createElement(mockText, null, "fechar")
          )
        )
      : null;

  return { EditFieldModal: MockModal };
});

describe("📌 CardMinhaConta", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      userData: { name: "Usuário Teste", email: "teste@exemplo.com" },
    });
  });

  it("renderiza título e campos corretamente", () => {
    render(<CardMinhaConta />);
    expect(screen.getByText("Minha conta")).toBeTruthy();

    const nomeInput = screen.getByPlaceholderText("Nome") as unknown as {
      props: { value: string };
    };
    const emailInput = screen.getByPlaceholderText("E-mail") as unknown as {
      props: { value: string };
    };
    const senhaInput = screen.getByPlaceholderText("Senha") as unknown as {
      props: { value: string };
    };

    expect(nomeInput.props.value).toBe("Usuário Teste");
    expect(emailInput.props.value).toBe("teste@exemplo.com");
    expect(senhaInput.props.value).toBe("********");
  });

  it("abre modal ao clicar no botão de editar Nome", () => {
    render(<CardMinhaConta />);
    const icons = screen.getAllByTestId("icon-mock");
    fireEvent.press(icons[0]);

    const fieldText = screen.getByTestId("modal-field") as unknown as {
      props: { children: string };
    };
    const initialText = screen.getByTestId("modal-initial") as unknown as {
      props: { children: string };
    };

    expect(fieldText.props.children).toBe("name");
    expect(initialText.props.children).toBe("Usuário Teste");
  });

  it("abre modal de edição de e-mail", () => {
    render(<CardMinhaConta />);
    const icons = screen.getAllByTestId("icon-mock");
    fireEvent.press(icons[1]);

    const fieldText = screen.getByTestId("modal-field") as unknown as {
      props: { children: string };
    };
    const initialText = screen.getByTestId("modal-initial") as unknown as {
      props: { children: string };
    };

    expect(fieldText.props.children).toBe("email");
    expect(initialText.props.children).toBe("teste@exemplo.com");
  });

  it("abre modal de edição de senha", () => {
    render(<CardMinhaConta />);
    const icons = screen.getAllByTestId("icon-mock");
    fireEvent.press(icons[2]);

    const fieldText = screen.getByTestId("modal-field") as unknown as {
      props: { children: string };
    };
    const initialText = screen.getByTestId("modal-initial") as unknown as {
      props: { children: string };
    };

    expect(fieldText.props.children).toBe("password");
    expect(initialText.props.children).toBe("");
  });

  it("fecha modal quando onClose é chamado", () => {
    render(<CardMinhaConta />);
    const icons = screen.getAllByTestId("icon-mock");
    fireEvent.press(icons[0]);

    fireEvent.press(screen.getByTestId("modal-onClose"));
    expect(screen.queryByTestId("modal-visible")).toBeNull();
  });
});
