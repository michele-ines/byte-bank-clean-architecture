import { texts } from "@presentation/theme";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import CardsScreen from "./CardsScreen";

jest.mock("@/src/components/common/ScreenWrapper/ScreenWrapper", () => {
  const { View, Text } = require("react-native");
  return {
    ScreenWrapper: ({ children }: any) => (
      <View>
        <Text testID="mock-screen-wrapper">ScreenWrapper</Text>
        {children}
      </View>
    ),
  };
});

jest.mock("@/src/components/cards/PersonalCards/PersonalCards", () => {
  const { Text } = require("react-native");
  return () => <Text testID="mock-personal-cards">PersonalCards</Text>;
});

describe("CardsScreen", () => {
  it("renderiza ScreenWrapper, título, subtítulo e PersonalCards", () => {
    render(<CardsScreen />);

    expect(screen.getByTestId("mock-screen-wrapper")).toBeTruthy();
    expect(screen.getByRole("header")).toBeTruthy();
    expect(screen.getByText(texts.textMeusCartoes)).toBeTruthy();
    expect(screen.getByText(texts.textConfigCardsSubtitle)).toBeTruthy();

    expect(screen.getByTestId("mock-personal-cards")).toBeTruthy();
  });
});
