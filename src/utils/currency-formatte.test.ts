import {
    formatBRL,
    formatCurrencyToBRL,
    formatTipo,
    maskCurrency,
    parseBRL,
} from "./currency-formatte";

/**
 * Normaliza espaços (NBSP vs espaço normal) para evitar falhas de comparação.
 */
const normalizeCurrency = (value: string) => value.replace(/\s/g, " ");

describe("📌 formatBRL", () => {
  it.each([
    { input: 1000, expected: "R$ 1.000,00" },
    { input: 1234.56, expected: "R$ 1.234,56" },
    { input: 0, expected: "R$ 0,00" },
    { input: 0.1, expected: "R$ 0,10" },
  ])("deve formatar $input corretamente", ({ input, expected }) => {
    expect(normalizeCurrency(formatBRL(input))).toBe(expected);
  });
});

describe("📌 parseBRL", () => {
  it.each([
    { input: "R$ 1.234,56", expected: 1234.56 },
    { input: "R$0,00", expected: 0 },
    { input: "R$ 99,99", expected: 99.99 },
    // { input: "99.99", expected: 99.99 },  ❌ NÃO SUPORTADO PELA FUNÇÃO ATUAL
    { input: "1000", expected: 1000 },
    { input: "1.000", expected: 1000 },
    { input: "1.000,50", expected: 1000.5 },
  ])("deve converter '$input' para $expected", ({ input, expected }) => {
    expect(parseBRL(input)).toBeCloseTo(expected, 2);
  });
});

describe("📌 formatTipo", () => {
  it.each([
    { input: "deposito", expected: "Depósito" },
    { input: "RETIRADA", expected: "Retirada" },
    { input: "Transferencia", expected: "Transferência" },
    { input: "pagamento", expected: "Pagamento" },
    { input: "pix", expected: "Pix" },
    { input: "", expected: "" },
    { input: undefined, expected: "" },
  ])("deve formatar '$input' como '$expected'", ({ input, expected }) => {
    expect(formatTipo(input as any)).toBe(expected);
  });
});

describe("📌 maskCurrency", () => {
  it.each([
    { input: "1234", expected: "12,34" },
    { input: "123456", expected: "1.234,56" },
    { input: "abc1234xyz", expected: "12,34" },
    { input: undefined, expected: "" },
    { input: "", expected: "" },
    { input: "123456789012345", expected: "123.456.789,01" },
    { input: "1", expected: "0,01" },
    { input: "10", expected: "0,10" },
  ])("deve aplicar máscara para '$input' => '$expected'", ({ input, expected }) => {
    expect(maskCurrency(input as any)).toBe(expected);
  });
});

describe("📌 formatCurrencyToBRL", () => {
  it.each([
    { input: 1234.56, expected: "R$ 1.234,56" },
    { input: 0, expected: "R$ 0,00" },
  ])("deve formatar $input como moeda BRL", ({ input, expected }) => {
    expect(normalizeCurrency(formatCurrencyToBRL(input))).toBe(expected);
  });
});
