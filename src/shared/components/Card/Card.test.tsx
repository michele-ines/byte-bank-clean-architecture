import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { Card } from "./Card";

describe("Card", () => {
  it("renderiza título e subtítulo corretamente", () => {
    render(<Card title="Título de Teste" subtitle="Subtítulo de Teste" />);

    expect(screen.getByText("Título de Teste")).toBeTruthy();
    expect(screen.getByText("Subtítulo de Teste")).toBeTruthy();
  });

  it("renderiza children dentro do card", () => {
    render(
      <Card title="Com Children">
        <Text>Conteúdo interno</Text>
      </Card>
    );

    expect(screen.getByText("Com Children")).toBeTruthy();
    expect(screen.getByText("Conteúdo interno")).toBeTruthy();
  });

  it("aplica estilo elevated por padrão", () => {
    const { getByText } = render(<Card title="Elevated Test" />);

    expect(getByText("Elevated Test")).toBeTruthy();
  });

  it("aplica estilo outlined quando especificado", () => {
    const { getByText } = render(
      <Card title="Outlined Test" variant="outlined" />
    );

    expect(getByText("Outlined Test")).toBeTruthy();
  });
});
