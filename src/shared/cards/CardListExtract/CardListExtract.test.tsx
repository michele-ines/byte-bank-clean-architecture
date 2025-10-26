import { render, screen } from "@testing-library/react-native";
import * as React from "react";
import { CardListExtract } from "./CardListExtract";

jest.mock("@/presentation/state/TransactionsContext", () => ({
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

jest.mock("@/shared/utils/transactions.utils", () => ({
  showToast: jest.fn(),
}));

jest.mock("@/presentation/theme", () => ({
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
  colors: { byteColorRed500: "red", byteColorBlue500: "blue" },
  spacing: { xs: 4, md: 8 },
  typography: {
    alignCenter: "center",
    justifyCenter: "center",
    liveRegionPolite: "polite",
  },
}));

jest.mock("@expo/vector-icons", () => ({
  Feather: (props: any) => React.createElement("Icon", props, props.name),
}));

describe("CardListExtract", () => {
  it("deve renderizar a transação com acessibilidade", () => {
    render(
      <CardListExtract
        title="Minhas Transações"
        filterFn={() => true}
      />
    );

    const label =
      "Transação do tipo Compra. Valor de R$ 120.50. Data: 2025-10-03.";

    expect(screen.getByLabelText(label)).toBeTruthy();
  });
});
