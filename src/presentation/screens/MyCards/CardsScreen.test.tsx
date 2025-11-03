import { texts } from "@presentation/theme";
import { render, screen } from "@testing-library/react-native";
import React, { type JSX, type PropsWithChildren } from "react";
import CardsScreen from "./CardsScreen";

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
      mockReact.createElement(mockText, { testID: "mock-screen-wrapper" }, "ScreenWrapper"),
      children
    );

  return { ScreenWrapper };
});
Object.assign(jest.requireMock("@presentation/components/common/common/ScreenWrapper/ScreenWrapper"), {
  displayName: "MockScreenWrapper",
});

jest.mock("@presentation/components/cards/cards/PersonalCards/PersonalCards", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  const reactNative = jest.requireActual<{ View: unknown; Text: unknown }>("react-native");
  const mockText = reactNative.Text;
  const PersonalCards = (): JSX.Element =>
    mockReact.createElement(mockText, { testID: "mock-personal-cards" }, "PersonalCards");
  // Export as default to match `import PersonalCards from '.../PersonalCards'`
  return { __esModule: true, default: PersonalCards };
});
Object.assign(jest.requireMock("@presentation/components/cards/cards/PersonalCards/PersonalCards"), {
  displayName: "MockPersonalCards",
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
