import type { Href } from "expo-router";

export const ROUTES = {
  HOME: "/" as Href,
  LOGIN: "/(public)/login/LoginPage" as Href,
  FORGOT_PASSWORD: "/(public)/esqueci-senha/ForgotPage" as Href,
  SIGNUP: "/(public)/cadastro/CadastroPage" as Href,
  DASHBOARD: "/(private)/dashboard" as Href,
  INVESTMENTS: "/(private)/investments" as Href,
  MEUS_CARTOES: "/(private)/meus-cartoes" as Href,
  OUTROS_SERVICOS: "/(private)/outros-servicos" as Href,
  MINHA_CONTA: "/(private)/minha-conta" as Href,
} as const;
