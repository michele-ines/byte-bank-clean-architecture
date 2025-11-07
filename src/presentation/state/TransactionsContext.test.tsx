import { fireEvent, render, waitFor } from "@testing-library/react-native";
import {
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import type { JSX } from "react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "./AuthContext";
import { TransactionsProvider, useTransactions } from "./TransactionsContext";

beforeAll((): void => {
  jest.spyOn(console, "error").mockImplementation((): void => {
    // Silencia erros
  });
});
afterAll((): void => {
  (console.error as jest.Mock).mockRestore();
});

const mockUser = { uid: "test-user-id" };

jest.mock("./AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(() => "mock-collection-ref"),
  doc: jest.fn(() => "mock-doc-ref"),
  deleteDoc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  limit: jest.fn(() => "mock-limit"),
  onSnapshot: jest.fn(),
  orderBy: jest.fn(() => "mock-order-by"),
  query: jest.fn(() => "mock-query"),
  serverTimestamp: jest.fn(() => ({ seconds: 1234567890, nanoseconds: 0 })),
  startAfter: jest.fn(() => "mock-start-after"),
  updateDoc: jest.fn(),
  where: jest.fn(() => "mock-where"),
  writeBatch: jest.fn(),
  arrayRemove: jest.fn(() => "mock-array-remove"),
}));

const fsMock = require("firebase/firestore") as { Timestamp: { now: () => { seconds: number } } };
fsMock.Timestamp = { now: () => ({ seconds: Math.floor(Date.now() / 1000) }) };

jest.mock("firebase/storage", () => ({
  deleteObject: jest.fn(),
  getDownloadURL: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
}));

jest.mock("../../infrastructure/config/firebaseConfig", () => ({
  db: {},
  storage: {},
}));

const TestComponent: React.FC = (): JSX.Element => {
  const {
    transactions,
    balance,
    addTransaction,
    updateTransaction,
    deleteTransactions,
    uploadAttachmentAndUpdateTransaction,
    deleteAttachment,
    loadMoreTransactions,
    loading,
    loadingMore,
    hasMore,
  } = useTransactions();

  const [error, setError] = React.useState<string | null>(null);

  const handleAddTransaction = (): void => {
    void (async (): Promise<void> => {
      try {
        await addTransaction({
          tipo: "deposito",
          valor: 100,
          description: "Test",
        });
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  const handleUpdateTransaction = (): void => {
    void (async (): Promise<void> => {
      try {
        await updateTransaction("test-id", { valor: 200 });
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  const handleDeleteTransactions = (): void => {
    void (async (): Promise<void> => {
      try {
        await deleteTransactions(["test-id"]);
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  const handleUploadAttachment = (): void => {
    void (async (): Promise<void> => {
      try {
        await uploadAttachmentAndUpdateTransaction(
          "test-id",
          "file://test.pdf",
          "test.pdf"
        );
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  const handleDeleteAttachment = (): void => {
    void (async (): Promise<void> => {
      try {
        await deleteAttachment("test-id", {
          name: "test.pdf",
          url: "http://test.com/test.pdf",
        });
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  const handleLoadMore = (): void => {
    void (async (): Promise<void> => {
      try {
        await loadMoreTransactions();
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  };

  return (
    <View>
      <Text testID="balance">{balance}</Text>
      <Text testID="loading">{loading.toString()}</Text>
      <Text testID="loadingMore">{loadingMore.toString()}</Text>
      <Text testID="hasMore">{hasMore.toString()}</Text>
      <Text testID="transactionsCount">{transactions.length}</Text>
      {error && <Text testID="error">{error}</Text>}

      <TouchableOpacity testID="addTransaction" onPress={handleAddTransaction}>
        <Text>Add Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="updateTransaction"
        onPress={handleUpdateTransaction}
      >
        <Text>Update Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="deleteTransactions"
        onPress={handleDeleteTransactions}
      >
        <Text>Delete Transactions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="uploadAttachment"
        onPress={handleUploadAttachment}
      >
        <Text>Upload Attachment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="deleteAttachment"
        onPress={handleDeleteAttachment}
      >
        <Text>Delete Attachment</Text>
      </TouchableOpacity>

      <TouchableOpacity testID="loadMore" onPress={handleLoadMore}>
        <Text>Load More</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderWithProvider = (
  component: React.ReactElement
): ReturnType<typeof render> => {
  return render(<TransactionsProvider>{component}</TransactionsProvider>);
};

describe("TransactionsContext", (): void => {
  beforeEach((): void => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    jest.clearAllMocks();

    (onSnapshot as jest.Mock).mockImplementation(
      (
        _query: unknown,
        callback: (snapshot: { forEach: (fn: (d: unknown) => void) => void; empty: boolean }) => void
      ): (() => void) => {
        const snapshot = {
          docs: [],
          empty: true,
          forEach: (fn: (d: unknown) => void) => {
            // No-op
          },
        };
        callback(snapshot);
        return jest.fn();
      }
    );
  });

  describe("addTransaction method", (): void => {
    it("deve adicionar uma nova transação com sucesso", async (): Promise<void> => {
      (addDoc as jest.Mock).mockResolvedValueOnce({ id: "new-transaction-id" });

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId("addTransaction"));

await waitFor(() => {
        expect(addDoc).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            descricao: 'Test',
            tipo: 'entrada',
            userId: 'test-user-id', // <-- Linha corrigida
            valor: 100,
          })
        );
      });
    });

    it("deve lançar erro quando usuário não está autenticado", async (): Promise<void> => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId("addTransaction"));

      await waitFor(() => {
        expect(getByTestId("error").children[0]).toBe(
          "Usuário não autenticado"
        );
      });
    });
  });

  describe("updateTransaction method", (): void => {
    it("deve atualizar uma transação com sucesso", async (): Promise<void> => {
      (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);
      (doc as jest.Mock).mockReturnValue({ id: "test-id" });

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId("updateTransaction"));

      await waitFor(() => {
        expect(updateDoc).toHaveBeenCalled();
      });
    });
  });

  describe("deleteTransactions method", (): void => {
    it("deve deletar transações com sucesso", async (): Promise<void> => {
      const mockBatch = {
        delete: jest.fn(),
        commit: jest.fn().mockResolvedValueOnce(undefined),
      };
      (writeBatch as jest.Mock).mockReturnValue(mockBatch);
      (doc as jest.Mock).mockReturnValue({ id: "test-id" });

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId("deleteTransactions"));

      await waitFor(() => {
        const firestoreModule = require("firebase/firestore") as { deleteDoc: jest.Mock };
        expect(firestoreModule.deleteDoc).toHaveBeenCalled();
      });
    });
  });

  describe("deleteAttachment method", (): void => {
    it("deve deletar anexo com sucesso", async (): Promise<void> => {
      (deleteObject as jest.Mock).mockResolvedValueOnce(undefined);
      (ref as jest.Mock).mockReturnValue("mock-file-ref");
      (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);

      const { getByTestId } = renderWithProvider(<TestComponent />);
      fireEvent.press(getByTestId("deleteAttachment"));

      await waitFor(() => {
        
        expect(deleteObject).toHaveBeenCalled();
        expect(updateDoc).toHaveBeenCalled();
      });
    });
  });
});