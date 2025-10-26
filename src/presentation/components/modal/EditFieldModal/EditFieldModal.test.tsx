import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { EditFieldModal } from "./EditFieldModal";

const mockUpdateName = jest.fn();
const mockUpdateEmail = jest.fn();
const mockUpdatePassword = jest.fn();
const mockOnClose = jest.fn();

jest.mock("@/src/hooks/useEditField", () => ({
  useEditField: () => ({
    value: "valor-inicial",
    setValue: jest.fn(),
    currentPassword: "",
    setCurrentPassword: jest.fn(),
    showCurrentPassword: false,
    setShowCurrentPassword: jest.fn(),
    showNewPassword: false,
    setShowNewPassword: jest.fn(),
    loading: false,
    setLoading: jest.fn(),
    error: { field: "", message: "" },
    setError: jest.fn(),
    updateEmail: mockUpdateEmail,
    updateName: mockUpdateName,
    updateUserPassword: mockUpdatePassword,
  }),
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    MaterialIcons: (props: any) => (
      <Text testID="mock-icon">{props.name}</Text>
    ),
  };
});

describe("EditFieldModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza corretamente quando field=name", () => {
    render(
      <EditFieldModal
        visible
        field="name"
        initialValue="Michele"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Editar nome")).toBeTruthy();
    expect(screen.getByPlaceholderText("Novo nome")).toBeTruthy();
  });

  it("renderiza corretamente quando field=email", () => {
    render(
      <EditFieldModal
        visible
        field="email"
        initialValue="teste@mail.com"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Editar e-mail")).toBeTruthy();
    expect(screen.getByPlaceholderText("Senha atual")).toBeTruthy();
    expect(screen.getByPlaceholderText("Novo e-mail")).toBeTruthy();
  });

  it("renderiza corretamente quando field=password", () => {
    render(
      <EditFieldModal
        visible
        field="password"
        initialValue=""
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Alterar senha")).toBeTruthy();
    expect(screen.getByPlaceholderText("Senha atual")).toBeTruthy();
    expect(screen.getByPlaceholderText("Nova senha")).toBeTruthy();
  });

  it("chama onClose ao clicar em Cancelar", () => {
    render(
      <EditFieldModal
        visible
        field="name"
        initialValue="abc"
        onClose={mockOnClose}
      />
    );

    fireEvent.press(screen.getByText("Cancelar"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("chama updateName ao salvar quando field=name", () => {
    render(
      <EditFieldModal
        visible
        field="name"
        initialValue="novo-nome"
        onClose={mockOnClose}
      />
    );

    fireEvent.press(screen.getByText("Salvar"));
    expect(mockUpdateName).toHaveBeenCalledWith("valor-inicial");
  });

  it("chama updateEmail ao salvar quando field=email", () => {
    render(
      <EditFieldModal
        visible
        field="email"
        initialValue="novo@mail.com"
        onClose={mockOnClose}
      />
    );

    fireEvent.press(screen.getByText("Salvar"));
    expect(mockUpdateEmail).toHaveBeenCalledWith("valor-inicial");
  });

  it("chama updateUserPassword ao salvar quando field=password", () => {
    render(
      <EditFieldModal
        visible
        field="password"
        initialValue="123"
        onClose={mockOnClose}
      />
    );

    fireEvent.press(screen.getByText("Salvar"));
    expect(mockUpdatePassword).toHaveBeenCalledWith("valor-inicial");
  });
});
