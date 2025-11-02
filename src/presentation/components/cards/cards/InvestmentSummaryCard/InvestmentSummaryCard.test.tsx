import type {
  DonutChartMockProps,
  ScrollViewMockProps,
  SvgMockProps,
} from "@/shared/interfaces/auth.interfaces";
import { texts } from "@presentation/theme";
import { render } from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
import { InvestmentSummaryCard } from "./InvestmentSummaryCard";
import { investmentSummaryMock } from "./Mock/InvestmentSummaryCard.mock";

jest.mock("@assets/images/dash-card-new-transacao/card-pixels-3.svg", () => {
  const React = require("react");
  const { View } = require("react-native");

  const SvgMock = (props: SvgMockProps): JSX.Element =>
    React.createElement(View, {
      accessible: props.accessible,
      accessibilityLabel: props.accessibilityLabel,
      testID: "TopIllustrationMock",
    });

  (SvgMock as React.FC).displayName = "TopIllustrationMock";
  return { __esModule: true, default: SvgMock };
});

jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");

  const ScrollViewMock = ({ children, ...props }: ScrollViewMockProps): JSX.Element =>
    React.createElement(View, props, children);

  (ScrollViewMock as React.FC).displayName = "ScrollViewMock";
  return { __esModule: true, ScrollView: ScrollViewMock };
});

jest.mock("@presentation/components/charts/DonutChart", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  const DonutChartMock = ({ accessibilityLabel, data }: DonutChartMockProps): JSX.Element =>
    React.createElement(
      View,
      { accessible: true, accessibilityLabel, testID: "DonutChart" },
      React.createElement(Text, null, `donut(${Array.isArray(data) ? data.length : 0})`)
    );

  (DonutChartMock as React.FC).displayName = "DonutChartMock";
  return { __esModule: true, DonutChart: DonutChartMock };
});

describe("InvestmentSummaryCard", () => {
  it("renderiza o título e o valor total corretamente", () => {
    const { getByText } = render(<InvestmentSummaryCard />);

    expect(getByText(texts.investmentSummary.title)).toBeTruthy();

    const totalFormatted = investmentSummaryMock.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    expect(
      getByText(`${texts.investmentSummary.totalLabel} ${totalFormatted}`)
    ).toBeTruthy();
  });

  it("renderiza cards de Renda Fixa e Renda Variável", () => {
    const { getByText } = render(<InvestmentSummaryCard />);

    const rendaFixa = investmentSummaryMock.fixedIncome.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const rendaVariavel = investmentSummaryMock.variableIncome.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    expect(getByText(texts.investmentSummary.fixedIncomeLabel)).toBeTruthy();
    expect(getByText(rendaFixa)).toBeTruthy();
    expect(getByText(texts.investmentSummary.variableIncomeLabel)).toBeTruthy();
    expect(getByText(rendaVariavel)).toBeTruthy();
  });

  it("renderiza os itens do portfólio na legenda", () => {
    const { getByText } = render(<InvestmentSummaryCard />);

    investmentSummaryMock.portfolio.forEach((item) => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it("possui labels de acessibilidade definidos", () => {
    const { getByLabelText, getByTestId } = render(<InvestmentSummaryCard />);

    expect(
      getByLabelText(texts.investmentSummary.accessibility.cardTopIllustration)
    ).toBeTruthy();

    expect(
      getByLabelText(texts.investmentSummary.accessibility.container)
    ).toBeTruthy();

    expect(
      getByLabelText(texts.investmentSummary.accessibility.fixedIncomeCard)
    ).toBeTruthy();

    expect(
      getByLabelText(texts.investmentSummary.accessibility.variableIncomeCard)
    ).toBeTruthy();

    expect(
      getByLabelText(texts.investmentSummary.accessibility.donutChart)
    ).toBeTruthy();
    expect(getByTestId("DonutChart")).toBeTruthy();

    expect(
      getByLabelText(texts.investmentSummary.accessibility.legend)
    ).toBeTruthy();
  });
});
