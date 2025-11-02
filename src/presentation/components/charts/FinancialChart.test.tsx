// FinancialChart.test.tsx
import { layout, spacing, texts } from "@presentation/theme";
import { render } from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import FinancialChart from "./FinancialChart";

// Props mínimas validadas nos testes (usar interface p/ regra eslint)
interface ChartProps {
  data: typeof texts.financialChartData;
  yAxisLabel: string;
  width: number;
  height: number;
  [key: string]: unknown;
}

// Mock tipado do LineChart
jest.mock("react-native-chart-kit", () => {
  return {
    LineChart: jest.fn((_props: ChartProps): JSX.Element | null => null),
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
    const mockLineChart = LineChart as unknown as jest.MockedFunction<
      (_props: ChartProps) => JSX.Element | null
    >;

    expect(mockLineChart).toHaveBeenCalledWith(
      expect.objectContaining<Partial<ChartProps>>({
        data: texts.financialChartData,
        yAxisLabel: texts.currencyPrefix,
      }),
      undefined
    );
  });

  it("calcula o width corretamente baseado no Dimensions", () => {
    const windowWidth = Dimensions.get("window").width;
    render(<FinancialChart />);
    const mockLineChart = LineChart as unknown as jest.MockedFunction<
      (_props: ChartProps) => JSX.Element | null
    >;

    expect(mockLineChart).toHaveBeenCalledWith(
      expect.objectContaining<Partial<ChartProps>>({
        width: windowWidth - spacing.xl,
      }),
      undefined
    );
  });

  it("passa a altura correta para o LineChart", () => {
    render(<FinancialChart />);
    const mockLineChart = LineChart as unknown as jest.MockedFunction<
      (_props: ChartProps) => JSX.Element | null
    >;

    expect(mockLineChart).toHaveBeenCalledWith(
      expect.objectContaining<Partial<ChartProps>>({
        height: layout.chartHeight,
      }),
      undefined
    );
  });
});
