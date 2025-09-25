const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const cardListTexts = {
  item: {
    receiptButton: "Ver Recibo",
    accessibility: {
      cardLabel: (type: string, value: number, date: string) => `Transação do tipo ${type}. Valor de ${formatCurrency(value)}. Data: ${date}.`,
      editingCardLabel: (type: string) => `Editando transação do tipo ${type}.`,
      amountInputLabel: (type: string) => `Valor da transação, tipo ${type}`,
      amountInputValue: (value: number) => `Valor atual: ${formatCurrency(value)}`,
      amountInputHint: "Digite o novo valor para esta transação",
      receiptButtonLabel: (type: string) => `Ver recibo da transação do tipo ${type}`,
      receiptButtonHint: "Toque duas vezes para abrir o comprovante",
    },
  },
  list: {
    empty: "Nenhuma transação encontrada.",
  },
  toasts: {
    saveSuccess: { title: "Sucesso!", message: "As transações foram atualizadas." },
    saveError: { title: "Erro!", message: "Não foi possível atualizar as transações." },
    deleteSoon: { title: "Em breve!", message: "A função para excluir o extrato ainda será implementada." },
    openReceiptError: { title: "Erro!", message: "Não foi possível abrir o link do recibo." },
  },
};