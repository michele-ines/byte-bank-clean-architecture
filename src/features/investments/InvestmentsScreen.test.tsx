import { render, screen } from "@testing-library/react-native";
import React from "react";
import InvestmentsScreen from "./InvestmentsScreen";

// Mock do ScreenWrapper
jest.mock("@/src/components/common/ScreenWrapper/ScreenWrapper", () => {
  const { View, Text } = require("react-native");
  return {
    ScreenWrapper: ({ children }: any) => (
      <View>
        {children}
        <Text testID="mock-screen-wrapper">ScreenWrapper</Text>
      </View>
    ),
  };
});

// Mock do InvestmentSummaryCard
jest.mock("@/src/components/cards/InvestmentSummaryCard/InvestmentSummaryCard", () => {
  const { Text } = require("react-native");
  return {
    InvestmentSummaryCard: () => (
      <Text testID="mock-investment-card">InvestmentSummaryCard</Text>
    ),
  };
});

describe("InvestmentsScreen", () => {
  it("renderiza o ScreenWrapper", () => {
    render(<InvestmentsScreen />);
    expect(screen.getByTestId("mock-screen-wrapper")).toBeTruthy();
  });

  it("renderiza o InvestmentSummaryCard dentro do ScreenWrapper", () => {
    render(<InvestmentsScreen />);
    expect(screen.getByTestId("mock-investment-card")).toBeTruthy();
  });
});
