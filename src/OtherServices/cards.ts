export type CardKind = "fisico" | "digital";
export type CardState = "active" | "blocked";

export async function apiToggleCardState(kind: CardKind, current: CardState) {
  // simula latência
  await new Promise((r) => setTimeout(r, 900));

  // simula chance pequena de erro
  if (Math.random() < 0.06) {
    throw new Error("Falha de conexão. Tente novamente.");
  }

  const next: CardState = current === "active" ? "blocked" : "active";
  return { kind, state: next };
}
