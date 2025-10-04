import { getCurrentDate } from "./date";

describe("getCurrentDate", () => {
  it("Deve retornar a data atual no formato esperado", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-15T12:00:00Z"));

    const resultado = getCurrentDate();

    expect(resultado).toMatch(/^[\wÀ-ÿ-]+, \d{2}\/\d{2}\/\d{4}$/);
    expect(resultado).toBe("Segunda-feira, 15/01/2024");

    jest.useRealTimers();
  });
});
