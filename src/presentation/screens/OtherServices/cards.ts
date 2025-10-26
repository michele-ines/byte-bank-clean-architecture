export type CardKind = "fisico" | "digital";
export type CardState = "active" | "blocked";

export async function apiToggleCardState(kind: CardKind, current: CardState) {
  await new Promise((r) => setTimeout(r, 900));

  if (Math.random() < 0.06) {
    throw new Error("Falha de conexão. Tente novamente.");
  }

  const next: CardState = current === "active" ? "blocked" : "active";
  return { kind, state: next };
}
