const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const cardListTexts = {
  item: {
    receiptButton: "Ver Recibo",
    attachButton: "Anexar Comprovante",
    deleteButton: "X",
    updatedAtLabel: "Atualizado em:",
    attachmentsTitle: "Anexos:",
    attachmentLink: (index: number) => `Anexo ${index + 1}`,

    accessibility: {
      cardLabel: (type: string, value: number, date: string) => `Transação do tipo ${type}. Valor de ${formatCurrency(value)}. Data: ${date}.`,
      editingCardLabel: (type: string) => `Editando transação do tipo ${type}.`,
      amountInputLabel: (type: string) => `Valor da transação, tipo ${type}`,
      amountInputValue: (value: number) => `Valor atual: ${formatCurrency(value)}`,
      amountInputHint: "Digite o novo valor para esta transação",
      receiptButtonLabel: (type: string) => `Ver recibo da transação do tipo ${type}`,
      receiptButtonHint: "Toque duas vezes para abrir o comprovante",
      attachButtonLabel: (type: string) => `Anexar comprovante para a transação do tipo ${type}`,
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
    attachSuccess: { title: "Sucesso!", message: "O anexo foi enviado e associado à transação." },
    attachError: { title: "Erro!", message: "Não foi possível enviar o anexo." },
    deleteAttachmentSuccess: { title: "Anexo Excluído", message: "O anexo foi removido com sucesso." },
    deleteAttachmentError: { title: "Erro", message: "Não foi possível excluir o anexo." },
    deleteTransactionsWarning: { title: "Atenção", message: "Selecione pelo menos um item para excluir." },
    deleteTransactionsSuccess: { title: "Sucesso!", message: (count: number) => `${count} item(ns) excluído(s) com sucesso.` },
    deleteTransactionsError: { title: "Erro", message: "Não foi possível excluir os itens selecionados." },
  },
  dialogs: {
    deleteAttachment: {
      title: "Confirmar Exclusão",
      message: "Tem certeza de que deseja excluir este anexo? Esta ação não pode ser desfeita.",
      cancelButton: "Cancelar",
      confirmButton: "Excluir",
    }
  }
};