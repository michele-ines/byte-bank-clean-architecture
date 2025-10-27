import { getFirstName } from "./string";

describe("getFirstName", () => {
  it("Deve retornar o primeiro nome de um nome completo", () => {
    expect(getFirstName("João Silva")).toBe("João");
    expect(getFirstName("Maria de Souza")).toBe("Maria");
    expect(getFirstName("Élise")).toBe("Élise");
  });

  it("Deve retornar uma string vazia se a entrada estiver vazia", () => {
    expect(getFirstName("")).toBe("");
  });

  it("Deve retornar uma string vazia se a entrada for indefinida", () => {
    expect(getFirstName(undefined)).toBe("");
  });
});
