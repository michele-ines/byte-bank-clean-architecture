import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { DefaultButton } from "./DefaultButton";

describe("DefaultButton", () => {
  const baseProps = {
    title: "Clique Aqui",
    onPress: jest.fn(),
    buttonStyle: [{ backgroundColor: "blue" }],
    textStyle: [{ color: "white" }],
    accessibilityLabel: "botao-clique",
    accessibilityHint: "aperte para executar ação",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza título quando não está em loading", () => {
    const { getByText } = render(<DefaultButton {...baseProps} />);
    expect(getByText("Clique Aqui")).toBeTruthy();
  });

  it("renderiza ActivityIndicator quando loading=true", () => {
    const { UNSAFE_getByType, queryByText } = render(
      <DefaultButton {...baseProps} loading />
    );
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    expect(queryByText("Clique Aqui")).toBeNull();
  });

  it("chama onPress quando clicado", () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <DefaultButton {...baseProps} onPress={onPress} />
    );
    fireEvent.press(getByLabelText("botao-clique"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("não chama onPress quando disabled=true", () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <DefaultButton {...baseProps} onPress={onPress} disabled />
    );
    fireEvent.press(getByLabelText("botao-clique"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("não chama onPress quando loading=true", () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <DefaultButton {...baseProps} onPress={onPress} loading />
    );
    fireEvent.press(getByLabelText("botao-clique"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("aplica accessibility props corretamente", () => {
    const { getByLabelText } = render(<DefaultButton {...baseProps} />);
    const button = getByLabelText("botao-clique");
    expect(button.props.accessibilityRole).toBe("button");
    expect(button.props.accessibilityHint).toBe("aperte para executar ação");
  });
});
