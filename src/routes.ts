import { Href } from "expo-router";

export const routes = {
  home: "/" as Href,  // 👈 agora a tela inicial é Home
  login: "/(public)/login/login" as Href,  // 👈 corrigido
  forgotPassword: "/(public)/esqueci-senha/ForgotPage" as Href,
  signup: "/(public)/cadastro/CadastroPage" as Href,
  dashboard: "/(private)/dashboard" as Href,
  investments: "/(private)/investments" as Href,
  meusCartoes: "/(private)/meus-cartoes" as Href,
  outrosServicos: "/(private)/outros-servicos" as Href,
  
};
