import { render, screen } from "@testing-library/react-native";
import React from "react";
import DashboardScreen from "./DashboardScreen";

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

// Mock do NewTransactionForm
jest.mock(
  "@/src/components/forms/NewTransactionForm/NewTransactionForm",
  () => {
    const { Text } = require("react-native"); // idem aqui
    return {
      NewTransactionForm: () => (
        <Text testID="mock-new-transaction-form">NewTransactionForm</Text>
      ),
    };
  }
);

describe("DashboardScreen", () => {
  it("renderiza o ScreenWrapper", () => {
    render(<DashboardScreen />);
    expect(screen.getByTestId("mock-screen-wrapper")).toBeTruthy();
  });

  it("renderiza o NewTransactionForm dentro do ScreenWrapper", () => {
    render(<DashboardScreen />);
    expect(screen.getByTestId("mock-new-transaction-form")).toBeTruthy();
  });
});
