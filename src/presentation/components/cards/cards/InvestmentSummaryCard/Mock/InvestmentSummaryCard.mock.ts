import { colors, texts } from "@presentation/theme";

const investmentTexts = texts.investmentSummary;

export const investmentSummaryMock = {
  total: investmentTexts.legenda.total,
  fixedIncome: investmentTexts.legenda.fixedIncome,
  variableIncome: investmentTexts.legenda.variableIncome,
  portfolio: [
    {
      name: investmentTexts.legenda.fundoInvesimentos.text,
      value: investmentTexts.legenda.fundoInvesimentos.value,
      color: colors.byteColorBlue500,
    },
    {
      name: investmentTexts.legenda.tesouroDireto.text,
      value: investmentTexts.legenda.tesouroDireto.value,
      color: colors.byteColorPurple500,
    },
    {
      name: investmentTexts.legenda.previdenciaPrivada.text,
      value: investmentTexts.legenda.previdenciaPrivada.value,
      color: colors.byteColorOrange300,
    },
    {
      name: investmentTexts.legenda.bolsaValores.text,
      value: investmentTexts.legenda.bolsaValores.value,
      color: colors.byteColorMagenta500,
    },
  ],
};
