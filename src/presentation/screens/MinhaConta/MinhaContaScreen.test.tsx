import { render, screen } from "@testing-library/react-native";
import React from "react";
import MyAccountPage from "./MinhaContaScreen";

jest.mock("@/assets/images/dash-card-my-account/card-pixels-3.svg", () => {
  const { Text } = require("react-native");
  return () => <Text testID="card-pixel-3">CardPixel3</Text>;
});
jest.mock("@/assets/images/dash-card-my-account/card-pixels-4.svg", () => {
  const { Text } = require("react-native");
  return () => <Text testID="card-pixel-4">CardPixel4</Text>;
});
jest.mock("@/assets/images/dash-card-my-account/ilustracao-card-accout.svg", () => {
  const { Text } = require("react-native");
  return () => <Text testID="illustration">MyAccountIllustration</Text>;
});

jest.mock("@/src/components/cards/CardMinhaConta/CardMinhaConta", () => {
  const { Text } = require("react-native");
  return { CardMinhaConta: () => <Text testID="card-minha-conta">CardMinhaConta</Text> };
});

describe("MyAccountPage", () => {
  it("renderiza os elementos principais", () => {
    render(<MyAccountPage />);

    expect(screen.getByTestId("card-pixel-3")).toBeTruthy();
    expect(screen.getByTestId("card-pixel-4")).toBeTruthy();
    expect(screen.getByTestId("illustration")).toBeTruthy();
    expect(screen.getByTestId("card-minha-conta")).toBeTruthy();
  });
});
