import { ToastType } from "@/src/types/types";
import Toast from "react-native-toast-message";

export const formTexts = {
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
  },
  toasts: {
    emptyFields: { title: "Atenção", message: "Selecione o tipo e informe o valor." },
    success: { title: "Sucesso!", message: "Transação adicionada com sucesso." },
    error: { title: "Erro", message: "Não foi possível adicionar a transação." },
  },
};

export const formatTransactionDescription = (type: string, value: number): string => {
  const formattedValue = value.toFixed(2).replace(".", ",");
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  return `${capitalizedType} - R$ ${formattedValue}`;
};

export const showToast = (type: ToastType, text1: string, text2: string) => {
  Toast.show({ type, text1, text2 });
};