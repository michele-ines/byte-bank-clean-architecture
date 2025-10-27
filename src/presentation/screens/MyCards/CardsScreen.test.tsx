import { texts } from "@presentation/theme";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";
import CardsScreen from "./CardsScreen";

jest.mock("@/src/components/common/ScreenWrapper/ScreenWrapper", () => ({
  ScreenWrapper: ({ children }: React.PropsWithChildren<{}>) => (
    <View>
      <Text testID="mock-screen-wrapper">ScreenWrapper</Text>
      {children}
    </View>
  ),
}));
(Object.assign(
  jest.requireMock("@/src/components/common/ScreenWrapper/ScreenWrapper"),
  { displayName: "MockScreenWrapper" }
));

jest.mock("@/src/components/cards/PersonalCards/PersonalCards", () => ({
  PersonalCards: () => <Text testID="mock-personal-cards">PersonalCards</Text>,
}));
(Object.assign(
  jest.requireMock("@/src/components/cards/PersonalCards/PersonalCards"),
  { displayName: "MockPersonalCards" }
));

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
