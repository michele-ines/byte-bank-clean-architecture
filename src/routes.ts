import { Href } from "expo-router";

export const routes = {
  login: "/" as Href,
  forgotPassword: "/(public)/esqueci-senha" as Href,
  signup: "/(public)/cadastro" as Href,
  dashboard: "/(private)/dashboard" as Href,
  investments: "/(private)/investments" as Href,
  meusCartoes: "/(private)/meus-cartoes" as Href,
  outrosServicos: "/(private)/outros-servicos" as Href,
  
};
