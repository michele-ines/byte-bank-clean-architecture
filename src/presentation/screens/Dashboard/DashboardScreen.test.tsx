import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";
import DashboardScreen from "./DashboardScreen";

jest.mock("@/src/components/common/ScreenWrapper/ScreenWrapper", () => ({
  ScreenWrapper: ({ children }: React.PropsWithChildren<{}>) => (
    <View>
      {children}
      <Text testID="mock-screen-wrapper">ScreenWrapper</Text>
    </View>
  ),
}));
(Object.assign(
  jest.requireMock("@/src/components/common/ScreenWrapper/ScreenWrapper"),
  { displayName: "MockScreenWrapper" }
));

jest.mock("@/src/components/forms/NewTransactionForm/NewTransactionForm", () => ({
  NewTransactionForm: () => (
    <Text testID="mock-new-transaction-form">NewTransactionForm</Text>
  ),
}));
(Object.assign(
  jest.requireMock("@/src/components/forms/NewTransactionForm/NewTransactionForm"),
  { displayName: "MockNewTransactionForm" }
));

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
