import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";
import InvestmentsScreen from "./InvestmentsScreen";

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

jest.mock("@/src/components/cards/InvestmentSummaryCard/InvestmentSummaryCard", () => ({
  InvestmentSummaryCard: () => (
    <Text testID="mock-investment-card">InvestmentSummaryCard</Text>
  ),
}));
(Object.assign(
  jest.requireMock("@/src/components/cards/InvestmentSummaryCard/InvestmentSummaryCard"),
  { displayName: "MockInvestmentSummaryCard" }
));

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
