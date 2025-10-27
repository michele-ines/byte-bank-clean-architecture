import { useAuth } from "@/presentation/state/AuthContext";
import { fireEvent, render, screen } from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CardMinhaConta } from "./CardMinhaConta";

jest.mock("@/src/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: (props: Record<string, unknown>): JSX.Element => (
    <Text testID="icon-mock" {...props}>
      IconMock
    </Text>
  ),
}));

jest.mock("../../modal/EditFieldModal/EditFieldModal", () => {
  interface MockModalProps {
    visible: boolean;
    field: string;
    initialValue: string;
    onClose: () => void;
  }

  const MockModal: React.FC<MockModalProps> = ({
    visible,
    field,
    initialValue,
    onClose,
  }) =>
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
