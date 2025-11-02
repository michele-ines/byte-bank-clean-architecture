import { render, screen } from "@testing-library/react-native";
import React from "react";
import InvestmentsScreen from "./InvestmentsScreen";

jest.mock("@presentation/components/common/common/ScreenWrapper/ScreenWrapper", () => {
  const React = require("react");
  const { View, Text } = require("react-native");
  const ScreenWrapper = ({ children }: React.PropsWithChildren<Record<string, unknown>>) =>
    React.createElement(View, null, children, React.createElement(Text, { testID: "mock-screen-wrapper" }, "ScreenWrapper"));

  return { ScreenWrapper };
});

Object.assign(
  jest.requireMock("@presentation/components/common/common/ScreenWrapper/ScreenWrapper"),
  { displayName: "MockScreenWrapper" }
);

(jest.mock("@presentation/components/cards/cards/InvestmentSummaryCard/InvestmentSummaryCard", () => {
  const React = require("react");
  const { Text } = require("react-native");
  const InvestmentSummaryCard = () => React.createElement(Text, { testID: "mock-investment-card" }, "InvestmentSummaryCard");

  return { InvestmentSummaryCard };
}));
(Object.assign(
  jest.requireMock("@presentation/components/cards/cards/InvestmentSummaryCard/InvestmentSummaryCard"),
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
