import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import MyAccountPage from "./MinhaContaScreen";

jest.mock("@/assets/images/dash-card-my-account/card-pixels-3.svg", () => {
  const CardPixel3 = () => <Text testID="card-pixel-3">CardPixel3</Text>;
  CardPixel3.displayName = "CardPixel3";
  return CardPixel3;
});

jest.mock("@/assets/images/dash-card-my-account/card-pixels-4.svg", () => {
  const CardPixel4 = () => <Text testID="card-pixel-4">CardPixel4</Text>;
  CardPixel4.displayName = "CardPixel4";
  return CardPixel4;
});

jest.mock("@/assets/images/dash-card-my-account/ilustracao-card-accout.svg", () => {
  const Illustration = () => <Text testID="illustration">MyAccountIllustration</Text>;
  Illustration.displayName = "MyAccountIllustration";
  return Illustration;
});

jest.mock("@/src/components/cards/CardMinhaConta/CardMinhaConta", () => {
  const CardMinhaConta = () => <Text testID="card-minha-conta">CardMinhaConta</Text>;
  CardMinhaConta.displayName = "CardMinhaConta";
  return { CardMinhaConta };
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
