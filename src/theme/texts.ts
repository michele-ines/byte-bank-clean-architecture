export const texts = {
  // Gerais
  cancelar: "Cancelar",
  confirmar: "Confirmar",
  carregando: "Carregando...",

  // Widgets
  textPersonalizarWidgets: "Personalizar Widgets",
  textEscolhaWidgets: "Escolha quais widgets deseja exibir no painel",
  textAlertaGastos: "Alerta de gastos",
  textMetaEconomia: "Meta de economia",
  textDescricaoGastos:
    "Monitore seus gastos mensais e receba alertas quando se aproximar do limite definido.",
  textDescricaoEconomia: "Defina metas de economia e acompanhe seu progresso.",
  textPreviewWidget: "Prévia do widget",
  textPreviewGastos:
    "Visualize seus gastos em tempo real e receba alertas quando atingir 80% do limite.",
  textPreviewEconomia:
    "Acompanhe o progresso com barra de progresso e celebre conquistas.",
  textLimiteAtual: "Limite atual",
  textGasto: "Gasto",
  textMetaAtual: "Meta atual",
  textEconomizado: "Economizado",
  textCancelar: "Cancelar",
  textConfirmar: "Confirmar",

  // 🎯 Valores de preview
  valorLimiteAtual: "R$ 2.000",
  valorGasto: "R$ 0",
  valorMetaAtual: "R$ 3.000",
  valorEconomizado: "R$ 0",

  // ♿ Labels de acessibilidade
  a11ySpendingAlert: "Ativar ou desativar alerta de gastos",
  a11yToggleSpendingAlert: "Alternar alerta de gastos",
  a11ySavingsGoal: "Ativar ou desativar meta de economia",
  a11yToggleSavingsGoal: "Alternar meta de economia",
  a11yCancelar: "Cancelar personalização",
  a11yConfirmar: "Confirmar personalização",
  a11yAbrirWidgetPrefs: "Abrir personalização de widgets",
  a11yMeusCartoes: "Meus cartões",
  a11yConfigurar: "Configurar cartão",
  a11yFinancialChart: "Gráfico financeiro de janeiro a junho",

  // 📝 Textos do SavingsGoalWidget
  textProgresso: "Progresso:",
  textParabens: "🎉 Parabéns! Você atingiu sua meta!",

  // 📝 Textos do SpendingAlertWidget
  textLimiteMensal: "Limite mensal",
  textTotalGasto: "Total gasto",
  textUltrapassouLimite: "⚠ Você ultrapassou o limite!",
  textDentroLimite: "Gastos dentro do limite",

  // 📊 Dados do FinancialChart
  financialChartData: {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [{ data: [1200, 2100, 800, 1600, 900, 1700] }],
  },

  // 📊 Configurações do gráfico
  currencyPrefix: "R$ ",
  textFinancialChart: "Gráfico Financeiro",

  // Cartões
  textMeusCartoes: "Meus cartões",
  textCartaoFisico: "Cartão físico",
  textCartaoDigital: "Cartão digital",
  textFuncaoFisico: "Função: Débito/Crédito",
  textFuncaoDigital: "Função: Débito",
  textConfigurar: "Configurar",
  textBloquear: "Bloquear",
  textDesbloquear: "Desbloquear",
  textAtivo: "Ativo",
  textBloqueado: "Bloqueado",
  textBloquearCartao: "Bloquear cartão",
  textDesbloquearCartao: "Desbloquear cartão",
  textMsgBloqueio:
    "Você confirma o bloqueio imediato deste cartão? Compras serão recusadas até o desbloqueio.",
  textMsgDesbloqueio:
    "Deseja desbloquear este cartão e voltar a usá-lo normalmente?",
  textConfigCardsSubtitle: "Configure e bloqueie seus cartões por aqui.",

  // 🆕 New Transaction Form
  newTransactionForm: {
    title: "Nova transação",
    labels: {
      transactionType: "Tipo de transação",
      amount: "Valor",
    },
    placeholders: {
      transactionType: "Selecione o tipo de transação",
      amount: "R$ 0,00",
    },
    buttons: {
      submit: "CONCLUIR TRANSAÇÃO",
    },
    accessibility: {
      form: "Formulário de nova transação",
      cardTopIllustration: "Ilustração decorativa superior com pixels",
      transactionTypeInput: "Seletor de tipo de transação",
      amountInput: "Campo de entrada de valor da transação",
      amountHint: "Digite o valor numérico da transação",
      submitButton: "Concluir e salvar nova transação",
      submitButtonLoading: "Salvando transação, por favor aguarde.",
      mainIllustration: "Ilustração de uma pessoa com um cartão de crédito",
      cardBottomIllustration: "Ilustração decorativa inferior com pixels",
      transactionTypeHint: "Toque para abrir a lista de tipos de transação",
      loading: "Carregando transação",
    },
    toasts: {
      emptyFields: {
        title: "Atenção",
        message: "Selecione o tipo e informe o valor.",
      },
      success: {
        title: "Sucesso!",
        message: "Transação adicionada com sucesso.",
      },
      error: {
        title: "Erro",
        message: "Não foi possível adicionar a transação.",
      },
    },
  },

  // 🆕 Textos utilitários de saldo
  hiddenBalanceMask: "••••••",
  loadingText: "Carregando...",

  // 🆕 Investment Summary
  investmentSummary: {
    title: "Investimentos",
    totalLabel: "Total:",
    fixedIncomeLabel: "Renda Fixa",
    variableIncomeLabel: "Renda variável",
    statsTitle: "Estatísticas",
    legendLabels: {
      investmentFunds: "Fundos de investimento",
      tesouroDireto: "Tesouro Direto",
      privatePension: "Previdência Privada",
      stockMarket: "Bolsa de Valores",
    },
    accessibility: {
      container: "Tela de resumo da sua carteira de investimentos",
      totalValue: "Valor total investido",
      fixedIncomeCard: "Card com o valor total em investimentos de renda fixa",
      variableIncomeCard:
        "Card com o valor total em investimentos de renda variável",
      donutChart:
        "Gráfico de pizza mostrando a distribuição percentual dos seus investimentos",
      legend: "Legenda para o gráfico de distribuição de investimentos",
      cardTopIllustration: "Ilustração decorativa superior com pixels",
    },
    legenda: {
      fundoInvesimentos: { text: "Fundos de investimento", value: 10000 },
      tesouroDireto: { text: "Tesouro Direto", value: 26000 },
      previdenciaPrivada: { text: "Previdência Privada", value: 4000 },
      bolsaValores: { text: "Bolsa de Valores", value: 10000 },
      total: 50000,
      fixedIncome: 36000,
      variableIncome: 14000,
    },
  },

  forgotPasswordForm: {
    title: "Recuperar Senha",
    label: "E-mail",
    placeholder: "Digite seu e-mail cadastrado",
    buttons: {
      submit: "ENVIAR LINK",
      back: "Voltar ao Login",
    },
    accessibility: {
      form: "Formulário de recuperação de senha",
      emailInput: "Campo de entrada para o e-mail de recuperação",
      submitButton: "Botão para enviar link de recuperação de senha",
      submitHint: "Envia um link de recuperação para o e-mail informado",
      backButton: "Botão para voltar à tela de login",
    },
    toasts: {
      emptyEmail: {
        title: "Atenção",
        message: "Informe o e-mail cadastrado.",
      },
      success: {
        title: "Pronto!",
        message: "Se o e-mail estiver cadastrado, um link será enviado.",
      },
      error: {
        title: "Erro",
        message: "Não foi possível enviar o link de recuperação.",
      },
    },
  },

  loginForm: {
    title: "Login",
    labels: {
      email: "Email",
      password: "Senha",
    },
    placeholders: {
      email: "Digite seu email",
      password: "Digite sua senha",
    },
    buttons: {
      submit: "ACESSAR",
      create: "CRIAR CONTA",
      forgot: "Esqueci a Senha!",
    },
    accessibility: {
      form: "Formulário de login",
      illustration:
        "Ilustração de uma pessoa interagindo com um celular gigante para fazer login.",
      emailInput: "Campo de entrada de email",
      passwordInput: "Campo de entrada de senha",
      passwordHint: "A senha será escondida por segurança",
      forgotLink: "Esqueci a senha! Toque para recuperar.",
      submitButton: "Acessar conta",
      submitHint: "Faz login na sua conta com as credenciais inseridas",
      createButton: "Criar nova conta",
      createHint: "Navega para a tela de criação de conta",
    },
    toasts: {
      emptyFields: { title: "Atenção", message: "Informe e-mail e senha." },
      loginError: {
        title: "Erro de Login",
        message: "Email ou senha inválidos.",
      },
      unexpectedError: {
        title: "Erro",
        message: "Ocorreu um erro inesperado.",
      },
    },
  },

  signupForm: {
    title: "Preencha os campos para criar sua conta!",
    fields: {
      name: "Nome",
      email: "Email",
      password: "Senha",
      confirmPassword: "Confirmar Senha",
    },
    placeholders: {
      name: "Digite seu nome completo",
      email: "Digite seu email",
      password: "Mínimo 8 caracteres",
      confirmPassword: "Confirme sua senha",
    },
    checkboxLabel:
      "Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.",
    buttons: {
      submit: "CRIAR CONTA",
      back: "VOLTAR",
    },
    accessibility: {
      form: "Formulário de cadastro de conta corrente",
      illustration:
        "Ilustração de uma pessoa interagindo com um ecrã de portátil seguro.",
      checkbox: "Checkbox para aceitar os termos de privacidade.",
      submitHint: "Cria uma nova conta e redireciona para o dashboard.",
      backHint: "Volta para a tela de login sem salvar as alterações.",
    },
    toasts: {
      emptyFields: {
        title: "Atenção",
        message: "Por favor, preencha todos os campos.",
      },
      passwordMismatch: {
        title: "Atenção",
        message: "As senhas não coincidem.",
      },
      passwordWeak: {
        title: "Senha Fraca",
        message: "A senha deve ter no mínimo 8 caracteres.",
      },
      termsNotAccepted: {
        title: "Atenção",
        message: "Você precisa aceitar os termos e condições.",
      },
      emailInvalid: {
        title: "Atenção",
        message: "Por favor, corrija o email antes de continuar.",
      },
      success: {
        title: "Sucesso!",
        message: "Conta criada. Você será redirecionado.",
      },
      emailInUse: {
        title: "Erro",
        message: "Este e-mail já está em uso.",
      },
      genericError: {
        title: "Erro",
        message: "Ocorreu um erro ao criar a conta.",
      },
    },
  },

  mainScreen: {
    hero: {
      title: "Experimente mais liberdade no controle da sua vida financeira.",
      subtitle: "Crie sua conta com a gente!",
    },
    buttons: {
      openAccount: "Abrir conta",
      login: "Já tenho conta",
    },
    advantages: {
      title: "Vantagens do nosso banco:",
      features: {
        freeAccount: {
          title: "Conta e cartão gratuitos",
          description:
            "Isso mesmo, nossa conta é digital,\nsem custo fixo e mais que isso:\nsem tarifa de manutenção.",
        },
        freeWithdrawals: {
          title: "Saques sem custo",
          description:
            "Você pode sacar gratuitamente 4x\npor mês de qualquer Banco 24h.",
        },
        pointsProgram: {
          title: "Programa de pontos",
          description:
            "Você pode acumular pontos com\nsuas compras no crédito sem pagar\nmensalidade!",
        },
        deviceInsurance: {
          title: "Seguro Dispositivos",
          description:
            "Seus dispositivos móveis\n(computador e laptop) protegidos\npor uma mensalidade simbólica.",
        },
      },
    },
  },

  // 🆕 Toasts genéricos de formulários
  formToasts: {
    success: {
      name: {
        title: "Sucesso!",
        message: "Nome atualizado com sucesso.",
      },
      email: {
        title: "Sucesso!",
        message: "E-mail atualizado com sucesso.",
      },
      password: {
        title: "Sucesso!",
        message: "Senha alterada com sucesso.",
      },
      generic: {
        title: "Sucesso!",
        message: "Dados atualizados com sucesso.",
      },
    },
    error: {
      name: {
        title: "Erro",
        message: "Não foi possível atualizar o nome.",
      },
      nameRequired: {
        title: "Erro",
        message: "O nome é obrigatório.",
      },
      nameTooShort: {
        title: "Erro",
        message: "O nome deve ter pelo menos 2 caracteres.",
      },
      nameInvalid: {
        title: "Erro",
        message: "O nome deve conter apenas letras.",
      },
      email: {
        title: "Erro",
        message: "Não foi possível atualizar o e-mail.",
      },
      emailRequired: {
        title: "Erro",
        message: "O e-mail é obrigatório.",
      },
      emailInUse: {
        title: "Erro",
        message: "Este e-mail já está em uso por outra conta.",
      },
      invalidEmail: {
        title: "Erro",
        message: "O e-mail informado não é válido.",
      },
      password: {
        title: "Erro",
        message: "Não foi possível alterar a senha.",
      },
      passwordRequired: {
        title: "Erro",
        message: "A senha é obrigatória.",
      },
      reauthWrongPassword: {
        title: "Senha incorreta",
        message: "Senha atual incorreta. Tente novamente.",
      },
      reauth: {
        title: "Senha necessária",
        message:
          "Por questões de segurança, é necessário que digite sua senha atual.",
      },
      weakPassword: {
        title: "Erro",
        message: "A senha deve ter no mínimo 8 caracteres.",
      },
      generic: {
        title: "Erro",
        message: "Não foi possível atualizar os dados.",
      },
    },
  },
};
