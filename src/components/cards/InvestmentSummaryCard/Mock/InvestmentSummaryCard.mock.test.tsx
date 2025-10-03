// InvestmentSummaryCard.mock.test.ts
import { texts } from "@/src/theme";
import { colors } from "@/src/theme/colors";
import { investmentSummaryMock } from "./InvestmentSummaryCard.mock";

describe("investmentSummaryMock", () => {
  it("deve conter os textos principais", () => {
    expect(investmentSummaryMock.total).toBe(texts.investmentSummary.legenda.total);
    expect(investmentSummaryMock.fixedIncome).toBe(texts.investmentSummary.legenda.fixedIncome);
    expect(investmentSummaryMock.variableIncome).toBe(texts.investmentSummary.legenda.variableIncome);
  });

  it("deve conter o portfólio correto", () => {
    expect(investmentSummaryMock.portfolio).toEqual([
      {
        name: texts.investmentSummary.legenda.fundoInvesimentos.text,
        value: texts.investmentSummary.legenda.fundoInvesimentos.value,
        color: colors.byteColorBlue500,
      },
      {
        name: texts.investmentSummary.legenda.tesouroDireto.text,
        value: texts.investmentSummary.legenda.tesouroDireto.value,
        color: colors.byteColorPurple500,
      },
      {
        name: texts.investmentSummary.legenda.previdenciaPrivada.text,
        value: texts.investmentSummary.legenda.previdenciaPrivada.value,
        color: colors.byteColorOrange300,
      },
      {
        name: texts.investmentSummary.legenda.bolsaValores.text,
        value: texts.investmentSummary.legenda.bolsaValores.value,
        color: colors.byteColorMagenta500,
      },
    ]);
  });

  it("deve ter 4 itens no portfólio", () => {
    expect(investmentSummaryMock.portfolio).toHaveLength(4);
  });
});
