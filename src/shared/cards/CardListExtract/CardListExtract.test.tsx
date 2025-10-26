import { render, screen } from "@testing-library/react-native";
import React from "react";
import { CardListExtract } from "./CardListExtract";

jest.mock("@/src/contexts/TransactionsContext", () => ({
  useTransactions: () => ({
    transactions: [
      {
        id: "1",
        tipo: "Compra",
        valor: 120.5,
        updateAt: "2025-10-03",
        anexos: [],
      },
    ],
    loading: false,
    loadingMore: false,
    hasMore: false,
    loadMoreTransactions: jest.fn(),
    updateTransaction: jest.fn(),
    uploadAttachmentAndUpdateTransaction: jest.fn(),
    deleteAttachment: jest.fn(),
    deleteTransactions: jest.fn(),
  }),
}));

jest.mock("@/src/utils/transactions.utils", () => ({
  showToast: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Feather: (props: any) => React.createElement("Icon", props, props.name),
  };
});

jest.mock("@/src/theme", () => ({
  texts: {
    cardList: {
      toasts: {
        openReceiptError: { title: "Erro", message: "Falha ao abrir recibo" },
        saveSuccess: { title: "Salvo", message: "Alterações salvas" },
        saveError: { title: "Erro", message: "Falha ao salvar" },
        attachSuccess: { title: "Sucesso", message: "Anexo salvo" },
        attachError: { title: "Erro", message: "Falha ao anexar" },
        deleteAttachmentSuccess: { title: "Sucesso", message: "Anexo removido" },
        deleteAttachmentError: { title: "Erro", message: "Falha ao remover" },
        deleteTransactionsWarning: { title: "Aviso", message: "Selecione algo" },
        deleteTransactionsSuccess: {
          title: "Sucesso",
          message: (n: number) => `${n} removidas`,
        },
        deleteTransactionsError: { title: "Erro", message: "Falha ao excluir" },
      },
      item: {
        accessibility: {
          cardLabel: (tipo: string, valor: number, data: string) =>
            `Transação do tipo ${tipo}. Valor de R$ ${valor.toFixed(
              2
            )}. Data: ${data}.`,
          editingCardLabel: (tipo: string) => `Editando transação ${tipo}`,
          amountInputLabel: (tipo: string) => `Editar valor da ${tipo}`,
          amountInputValue: (valor: number) => `Valor atual R$ ${valor}`,
          amountInputHint: "Digite o valor em reais",
          attachButtonLabel: (tipo: string) => `Anexar recibo da ${tipo}`,
        },
        updatedAtLabel: "Atualizado em",
        attachmentsTitle: "Anexos",
        attachmentLink: (n: number) => `Recibo ${n}`,
        attachButton: "Anexar Recibo",
      },
      list: { empty: "Nenhuma transação encontrada" },
      dialogs: {
        deleteAttachment: {
          title: "Excluir",
          message: "Confirma?",
          cancelButton: "Cancelar",
          confirmButton: "Excluir",
        },
      },
    },
  },
  colors: {
    byteColorRed500: "red",
    byteColorBlue500: "blue",
    byteColorWhite: "white",
    byteColorDash: "gray",
  },
  layout: { flexRow: "row", width36: 36, height36: 36 },
  spacing: { xs: 4, md: 8 },
  typography: {
    alignCenter: "center",
    justifyCenter: "center",
    liveRegionPolite: "polite",
  },
  radius: { sm: 2, md: 4, lg: 8, xl: 16 },
  sizes: { iconSm: 12, iconMd: 16, iconLg: 24 },
}));

describe("CardListExtract", () => {
  it("deve renderizar a transação com acessibilidade", () => {
    render(<CardListExtract title="Minhas Transações" filterFn={() => true} />);

    const label =
      "Transação do tipo Compra. Valor de R$ 120.50. Data: 2025-10-03.";
    expect(screen.getByLabelText(label)).toBeTruthy();
  });
});
