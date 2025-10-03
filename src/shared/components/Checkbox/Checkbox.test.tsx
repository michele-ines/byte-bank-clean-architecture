import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renderiza com valor inicial false", () => {
    render(
      <Checkbox
        value={false}
        onValueChange={() => {}}
        accessibilityLabel="Aceitar termos"
      />
    );

    const checkbox = screen.getByLabelText("Aceitar termos");
    expect(checkbox).toBeTruthy();
    expect(checkbox.props.accessibilityState.checked).toBe(false);
  });

  it("renderiza marcado quando value=true", () => {
    render(
      <Checkbox
        value={true}
        onValueChange={() => {}}
        accessibilityLabel="Ativo"
      />
    );

    const checkbox = screen.getByLabelText("Ativo");
    expect(checkbox).toBeTruthy();
    expect(checkbox.props.accessibilityState.checked).toBe(true);
  });

  it("permite passar cor customizada (não quebra)", () => {
    render(
      <Checkbox
        value={true}
        onValueChange={() => {}}
        color="red"
        accessibilityLabel="Custom"
      />
    );

    const checkbox = screen.getByLabelText("Custom");
    expect(checkbox).toBeTruthy();
    expect(checkbox.props.accessibilityState.checked).toBe(true);
  });

  it("dispara onValueChange quando clicado", () => {
    const mockOnChange = jest.fn();
    render(
      <Checkbox
        value={false}
        onValueChange={mockOnChange}
        accessibilityLabel="Clique aqui"
      />
    );

    const checkbox = screen.getByLabelText("Clique aqui");
    fireEvent(checkbox, "onValueChange", true);

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });
});
