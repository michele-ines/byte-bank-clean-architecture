import { useAuth } from "@/presentation/state/AuthContext";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CardMinhaConta } from "./CardMinhaConta";

// Mocks
jest.mock("@/src/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: (props: any) => (
    <Text testID="icon-mock" {...props}>
      IconMock
    </Text>
  ),
}));

jest.mock("../../modal/EditFieldModal/EditFieldModal", () => {
  const MockModal: React.FC<any> = ({ visible, field, initialValue, onClose }) =>
    visible ? (
      <View>
        <Text testID="modal-field">{field}</Text>
        <Text testID="modal-initial">{initialValue}</Text>
        <Text testID="modal-visible">true</Text>
        <TouchableOpacity testID="modal-onClose" onPress={onClose}>
          <Text>fechar</Text>
        </TouchableOpacity>
      </View>
    ) : null;

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
    expect(screen.getByPlaceholderText("Nome").props.value).toBe("Usuário Teste");
    expect(screen.getByPlaceholderText("E-mail").props.value).toBe("teste@exemplo.com");
    expect(screen.getByPlaceholderText("Senha").props.value).toBe("********");
  });

  it("abre modal ao clicar no botão de editar Nome", () => {
    render(<CardMinhaConta />);
    const icons = screen.getAllByTestId("icon-mock");
    fireEvent.press(icons[0]); // Nome

    expect(screen.getByTestId("modal-field").props.children).toBe("name");
    expect(screen.getByTestId("modal-initial").props.children).toBe("Usuário Teste");
  });

  it("abre modal de edição de e-mail", () => {
    render(<CardMinhaConta />);
    const icons = screen.getAllByTestId("icon-mock");
    fireEvent.press(icons[1]);

    expect(screen.getByTestId("modal-field").props.children).toBe("email");
    expect(screen.getByTestId("modal-initial").props.children).toBe("teste@exemplo.com");
  });

  it("abre modal de edição de senha", () => {
    render(<CardMinhaConta />);
    const icons = screen.getAllByTestId("icon-mock");
    fireEvent.press(icons[2]);

    expect(screen.getByTestId("modal-field").props.children).toBe("password");
    expect(screen.getByTestId("modal-initial").props.children).toBe("");
  });

  it("fecha modal quando onClose é chamado", () => {
    render(<CardMinhaConta />);
    const icons = screen.getAllByTestId("icon-mock");
    fireEvent.press(icons[0]);

    fireEvent.press(screen.getByTestId("modal-onClose"));
    expect(screen.queryByTestId("modal-visible")).toBeNull();
  });
});
