import { texts } from "@/src/theme";
import { render } from "@testing-library/react-native";
import React from "react";
import { InvestmentSummaryCard } from "./InvestmentSummaryCard";
import { investmentSummaryMock } from "./Mock/InvestmentSummaryCard.mock";

// 🔹 Mock do SVG (vira um View acessível simples)
jest.mock("@/assets/images/dash-card-new-transacao/card-pixels-3.svg", () => {
  const React = require("react");
  const { View } = require("react-native");
  return (props: any) =>
    React.createElement(View, {
      accessible: props.accessible,
      accessibilityLabel: props.accessibilityLabel,
    });
});

// 🔹 Mock do react-native-gesture-handler (só ScrollView)
jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    ScrollView: ({ children, ...props }: any) =>
      React.createElement(View, props, children),
  };
});

// 🔹 Mock do DonutChart (evita dependências nativas)
jest.mock("../../DonutChart/DonutChart", () => {
  const React = require("react");
  const { View, Text } = require("react-native");
  return {
    DonutChart: ({ accessibilityLabel, data }: any) =>
      React.createElement(
        View,
        { accessible: true, accessibilityLabel, testID: "DonutChart" },
        React.createElement(Text, null, `donut(${Array.isArray(data) ? data.length : 0})`)
      ),
  };
});

describe("InvestmentSummaryCard", () => {
  it("renderiza o título e o valor total corretamente", () => {
    const { getByText } = render(<InvestmentSummaryCard />);

    // Título
    expect(getByText(texts.investmentSummary.title)).toBeTruthy();

    // Valor total formatado
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
