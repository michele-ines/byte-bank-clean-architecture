import { render, screen } from "@testing-library/react-native";
import React from "react";
import DashboardScreen from "./DashboardScreen";

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

jest.mock("@presentation/components/forms/NewTransactionForm/NewTransactionForm", () => {
  const React = require("react");
  const { Text } = require("react-native");
  const NewTransactionForm = () => React.createElement(Text, { testID: "mock-new-transaction-form" }, "NewTransactionForm");

  return { NewTransactionForm };
});

Object.assign(
  jest.requireMock("@presentation/components/forms/NewTransactionForm/NewTransactionForm"),
  { displayName: "MockNewTransactionForm" }
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
