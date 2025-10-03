import { layout } from "@/src/theme/layout";
import { spacing } from "@/src/theme/spacing";
import { texts } from "@/src/theme/texts";
import { render } from "@testing-library/react-native";
import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import FinancialChart from "./FinancialChart";

// mock do LineChart porque usa código nativo pesado
jest.mock("react-native-chart-kit", () => {
  return {
    LineChart: jest.fn(() => {
      return <>{/* Mocked LineChart */}</>;
    }),
  };
});

describe("FinancialChart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o título corretamente", () => {
    const { getByText } = render(<FinancialChart />);
    expect(getByText(texts.textFinancialChart)).toBeTruthy();
  });

  it("tem acessibilidade configurada", () => {
    const { getByLabelText } = render(<FinancialChart />);
    expect(getByLabelText(texts.a11yFinancialChart)).toBeTruthy();
  });

  it("renderiza o LineChart com os dados e prefixo corretos", () => {
    render(<FinancialChart />);

    const firstCall = (LineChart as jest.Mock).mock.calls[0][0];
    expect(firstCall).toEqual(
      expect.objectContaining({
        data: texts.financialChartData,
        yAxisLabel: texts.currencyPrefix,
      })
    );
  });

  it("calcula o width corretamente baseado no Dimensions", () => {
    const windowWidth = Dimensions.get("window").width;
    render(<FinancialChart />);

    const firstCall = (LineChart as jest.Mock).mock.calls[0][0];
    expect(firstCall.width).toBe(windowWidth - spacing.xl);
  });

  it("passa a altura correta para o LineChart", () => {
    render(<FinancialChart />);
    const firstCall = (LineChart as jest.Mock).mock.calls[0][0];
    expect(firstCall.height).toBe(layout.chartHeight);
  });
});
