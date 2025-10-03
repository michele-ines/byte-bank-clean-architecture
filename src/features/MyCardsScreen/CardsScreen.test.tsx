// src/features/MyCardsScreen/CardsScreen.test.tsx
import { texts } from "@/src/theme";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import CardsScreen from "./CardsScreen";

// mock do ScreenWrapper
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

// mock do PersonalCards
jest.mock("@/src/components/cards/PersonalCards/PersonalCards", () => {
  const { Text } = require("react-native");
  return () => <Text testID="mock-personal-cards">PersonalCards</Text>;
});

describe("CardsScreen", () => {
  it("renderiza ScreenWrapper, título, subtítulo e PersonalCards", () => {
    render(<CardsScreen />);

    // ScreenWrapper mockado
    expect(screen.getByTestId("mock-screen-wrapper")).toBeTruthy();

    // Título e subtítulo vindos do texts
    expect(screen.getByRole("header")).toBeTruthy();
    expect(screen.getByText(texts.textMeusCartoes)).toBeTruthy();
    expect(screen.getByText(texts.textConfigCardsSubtitle)).toBeTruthy();

    // PersonalCards mockado
    expect(screen.getByTestId("mock-personal-cards")).toBeTruthy();
  });
});
