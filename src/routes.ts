import { Href } from "expo-router";

export const routes = {
  home: "/" as Href, 
  login: "/(public)/login/LoginPage" as Href,  
  forgotPassword: "/(public)/esqueci-senha/ForgotPage" as Href,
  signup: "/(public)/cadastro/CadastroPage" as Href,
  dashboard: "/(private)/dashboard" as Href,
  investments: "/(private)/investments" as Href,
  meusCartoes: "/(private)/meus-cartoes" as Href,
  outrosServicos: "/(private)/outros-servicos" as Href,
  
};
