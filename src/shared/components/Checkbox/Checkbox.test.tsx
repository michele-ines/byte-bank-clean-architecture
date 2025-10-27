import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import type { ReactTestInstance } from "react-test-renderer";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  // Função auxiliar com tipo explícito de retorno
  const getCheckbox = (label: string): ReactTestInstance => {
    return screen.getByLabelText(label) as unknown as ReactTestInstance;
  };

  it("renderiza com valor inicial false", (): void => {
    const handleChange = jest.fn();

    render(
      <Checkbox
        value={false}
        onValueChange={handleChange}
        accessibilityLabel="Aceitar termos"
      />
    );

    const checkbox = getCheckbox("Aceitar termos");
    const state = checkbox.props.accessibilityState as { checked?: boolean };

    expect(checkbox).toBeTruthy();
    expect(state.checked).toBe(false);
  });

  it("renderiza marcado quando value=true", (): void => {
    const handleChange = jest.fn();

    render(
      <Checkbox
        value
        onValueChange={handleChange}
        accessibilityLabel="Ativo"
      />
    );

    const checkbox = getCheckbox("Ativo");
    const state = checkbox.props.accessibilityState as { checked?: boolean };

    expect(checkbox).toBeTruthy();
    expect(state.checked).toBe(true);
  });

  it("permite passar cor customizada (não quebra)", (): void => {
    const handleChange = jest.fn();

    render(
      <Checkbox
        value
        onValueChange={handleChange}
        color="red"
        accessibilityLabel="Custom"
      />
    );

    const checkbox = getCheckbox("Custom");
    const state = checkbox.props.accessibilityState as { checked?: boolean };

    expect(checkbox).toBeTruthy();
    expect(state.checked).toBe(true);
  });

  it("dispara onValueChange quando clicado", (): void => {
    const mockOnChange = jest.fn();

    render(
      <Checkbox
        value={false}
        onValueChange={mockOnChange}
        accessibilityLabel="Clique aqui"
      />
    );

    const checkbox = getCheckbox("Clique aqui");
    fireEvent(checkbox, "onValueChange", true);

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });
});
