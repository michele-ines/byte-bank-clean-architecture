import { render, screen } from "@testing-library/react-native";
import React, { type JSX, type PropsWithChildren } from "react";
import DashboardScreen from "./DashboardScreen";

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

jest.mock("@presentation/components/forms/NewTransactionForm/NewTransactionForm", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown }>("react-native");
  const mockText = reactNative.Text;
  const NewTransactionForm = (): JSX.Element =>
    mockReact.createElement(mockText, { testID: "mock-new-transaction-form" }, "NewTransactionForm");

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
