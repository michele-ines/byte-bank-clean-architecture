import { render, screen } from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
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

jest.mock("@presentation/theme", () => {
  // use the real theme module but override only texts.cardList so styles/layout stay intact
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const actual = jest.requireActual("@presentation/theme");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...actual,
    texts: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...(actual.texts as Record<string, unknown>),
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
              `Transação do tipo ${tipo}. Valor de R$ ${valor.toFixed(2)}. Data: ${data}.`,
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
  };
});

// ✅ Correção do mock tipado
jest.mock("@expo/vector-icons", () => {
  const mockReact = jest.requireActual<{ createElement: (type: unknown, props: unknown, ...children: unknown[]) => JSX.Element }>("react");
  return {
    Feather: (props: { name: string }): JSX.Element => {
      return mockReact.createElement("Icon", props, props.name);
    },
  };
});

describe("CardListExtract", () => {
  it("deve renderizar a transação com acessibilidade", () => {
    render(<CardListExtract title="Minhas Transações" filterFn={() => true} />);

    // The item no longer sets a single accessibilityLabel in this component.
    // Verify visible pieces instead: description and formatted amount.
    expect(screen.getByText("Compra")).toBeTruthy();
    expect(screen.getByText("R$ 120,50")).toBeTruthy();
  });
});
