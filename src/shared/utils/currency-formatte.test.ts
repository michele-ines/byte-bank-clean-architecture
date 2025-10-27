import {
  formatBRL,
  formatCurrencyToBRL,
  formatTipo,
  maskCurrency,
  parseBRL,
} from "./currency-formatte";

const normalizeCurrency = (value: string): string => value.replace(/\s/g, " ");

// ----------------------
// 📌 formatBRL
// ----------------------
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

// ----------------------
// 📌 parseBRL
// ----------------------
describe("📌 parseBRL", () => {
  it.each([
    { input: "R$ 1.234,56", expected: 1234.56 },
    { input: "R$0,00", expected: 0 },
    { input: "R$ 99,99", expected: 99.99 },
    { input: "1000", expected: 1000 },
    { input: "1.000", expected: 1000 },
    { input: "1.000,50", expected: 1000.5 },
  ])("deve converter '$input' para $expected", ({ input, expected }) => {
    expect(parseBRL(input)).toBeCloseTo(expected, 2);
  });
});

// ----------------------
// 📌 formatTipo
// ----------------------
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
    // ✅ Faz o narrowing de tipo antes de chamar
    const valor =
      typeof input === "string" || typeof input === "undefined" ? input : "";
    expect(formatTipo(valor)).toBe(expected);
  });
});

// ----------------------
// 📌 maskCurrency
// ----------------------
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
    // ✅ Faz a checagem antes de passar
    const valor =
      typeof input === "string" || typeof input === "undefined" ? input : "";
    expect(maskCurrency(valor)).toBe(expected);
  });
});

// ----------------------
// 📌 formatCurrencyToBRL
// ----------------------
describe("📌 formatCurrencyToBRL", () => {
  it.each([
    { input: 1234.56, expected: "R$ 1.234,56" },
    { input: 0, expected: "R$ 0,00" },
  ])("deve formatar $input como moeda BRL", ({ input, expected }) => {
    expect(normalizeCurrency(formatCurrencyToBRL(input))).toBe(expected);
  });
});
