import { render, screen } from "@testing-library/react-native";
import React, { type JSX, type PropsWithChildren } from "react";
import InvestmentsScreen from "./InvestmentsScreen";

jest.mock("@presentation/components/common/common/ScreenWrapper/ScreenWrapper", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown }>("react-native");
  const mockView = reactNative.View;
  const mockText = reactNative.Text;
  const ScreenWrapper = ({
    children,
  }: PropsWithChildren<Record<string, unknown>>): JSX.Element =>
    mockReact.createElement(
      mockView,
      null,
      children,
      mockReact.createElement(mockText, { testID: "mock-screen-wrapper" }, "ScreenWrapper")
    );

  return { ScreenWrapper };
});

Object.assign(
  jest.requireMock("@presentation/components/common/common/ScreenWrapper/ScreenWrapper"),
  { displayName: "MockScreenWrapper" }
);

jest.mock("@presentation/components/cards/cards/InvestmentSummaryCard/InvestmentSummaryCard", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown }>("react-native");
  const mockText = reactNative.Text;
  const InvestmentSummaryCard = (): JSX.Element =>
    mockReact.createElement(mockText, { testID: "mock-investment-card" }, "InvestmentSummaryCard");

  return { InvestmentSummaryCard };
});
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
