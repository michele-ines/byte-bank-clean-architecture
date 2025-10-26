import { fireEvent, render, renderHook, waitFor } from "@testing-library/react-native";
import {
  addDoc,
  arrayRemove,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  writeBatch
} from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "./AuthContext";
import { TransactionsProvider, useTransactions } from "./TransactionsContext";

// ▶️ Silencia console.error
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

// ▶️ MOCK do useAuth
const mockUser = { uid: "test-user-id" };
jest.mock("@/src/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// ▶️ MOCK do Firebase Firestore
jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(() => "mock-collection-ref"),
  doc: jest.fn(() => "mock-doc-ref"),
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

// ▶️ MOCK do Firebase Storage
jest.mock("firebase/storage", () => ({
  deleteObject: jest.fn(),
  getDownloadURL: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
}));

// ▶️ MOCK do Firebase Config
jest.mock("../config/firebaseConfig", () => ({
  db: {},
  storage: {},
}));

// ▶️ Helper para criar um componente de teste
const TestComponent = () => {
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

  const handleAddTransaction = async () => {
    try {
      await addTransaction({ tipo: "deposito", valor: 100, description: "Test" });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleUpdateTransaction = async () => {
    try {
      await updateTransaction("test-id", { valor: 200 });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteTransactions = async () => {
    try {
      await deleteTransactions(["test-id"]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleUploadAttachment = async () => {
    try {
      await uploadAttachmentAndUpdateTransaction("test-id", "file://test.pdf", "test.pdf");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteAttachment = async () => {
    try {
      await deleteAttachment("test-id", { name: "test.pdf", url: "http://test.com/test.pdf" });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleLoadMore = async () => {
    try {
      await loadMoreTransactions();
    } catch (err) {
      setError((err as Error).message);
    }
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
      
      <TouchableOpacity testID="updateTransaction" onPress={handleUpdateTransaction}>
        <Text>Update Transaction</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="deleteTransactions" onPress={handleDeleteTransactions}>
        <Text>Delete Transactions</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="uploadAttachment" onPress={handleUploadAttachment}>
        <Text>Upload Attachment</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="deleteAttachment" onPress={handleDeleteAttachment}>
        <Text>Delete Attachment</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="loadMore" onPress={handleLoadMore}>
        <Text>Load More</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <TransactionsProvider>
      {component}
    </TransactionsProvider>
  );
};

describe("TransactionsContext", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    jest.clearAllMocks();
    
    // Mock padrão para onSnapshot
    (onSnapshot as jest.Mock).mockImplementation((query, callback) => {
      callback({
        docs: [],
        empty: true,
      });
      return jest.fn(); // unsubscribe function
    });
  });

  describe("addTransaction method", () => {
    it("deve adicionar uma nova transação com sucesso", async () => {
      (addDoc as jest.Mock).mockResolvedValueOnce({ id: "new-transaction-id" });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("addTransaction"));
      
      await waitFor(() => {
        expect(addDoc).toHaveBeenCalledWith(
          expect.anything(), // collection reference
          {
            tipo: "deposito",
            valor: 100,
            description: "Test",
            userId: "test-user-id",
            anexos: [],
            createdAt: expect.anything(),
            updateAt: expect.anything(),
          }
        );
      });
    });

    it("deve lançar erro quando usuário não está autenticado", async () => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("addTransaction"));
      
      await waitFor(() => {
        expect(getByTestId("error")).toBeTruthy();
        expect(getByTestId("error").children[0]).toBe("Usuário não autenticado.");
      });
      
      expect(addDoc).not.toHaveBeenCalled();
    });
  });

  describe("updateTransaction method", () => {
    it("deve atualizar uma transação com sucesso", async () => {
      (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);
      (doc as jest.Mock).mockReturnValue({ id: "test-id" });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("updateTransaction"));
      
      await waitFor(() => {
        expect(updateDoc).toHaveBeenCalledWith(
          expect.anything(), // document reference
          {
            valor: 200,
            updateAt: expect.anything(),
          }
        );
      });
    });

    it("deve tratar erro ao atualizar transação", async () => {
      const error = new Error("Update failed");
      (updateDoc as jest.Mock).mockRejectedValueOnce(error);
      (doc as jest.Mock).mockReturnValue({ id: "test-id" });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("updateTransaction"));
      
      await waitFor(() => {
        expect(updateDoc).toHaveBeenCalled();
      });
    });
  });

  describe("deleteTransactions method", () => {
    it("deve deletar transações com sucesso", async () => {
      const mockBatch = {
        delete: jest.fn(),
        commit: jest.fn().mockResolvedValueOnce(undefined),
      };
      (writeBatch as jest.Mock).mockReturnValue(mockBatch);
      (doc as jest.Mock).mockReturnValue({ id: "test-id" });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("deleteTransactions"));
      
      await waitFor(() => {
        expect(mockBatch.delete).toHaveBeenCalled();
        expect(mockBatch.commit).toHaveBeenCalled();
      });
    });

    it("deve lançar erro quando usuário não está autenticado", async () => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("deleteTransactions"));
      
      await waitFor(() => {
        expect(writeBatch).not.toHaveBeenCalled();
      });
    });
  });

  describe("uploadAttachmentAndUpdateTransaction method", () => {
    it("deve lançar erro quando usuário não está autenticado", async () => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("uploadAttachment"));
      
      await waitFor(() => {
        expect(uploadBytesResumable).not.toHaveBeenCalled();
      });
    });
  });

  describe("deleteAttachment method", () => {
    it("deve deletar anexo com sucesso", async () => {
      (deleteObject as jest.Mock).mockResolvedValueOnce(undefined);
      (ref as jest.Mock).mockReturnValue("mock-file-ref");
      (doc as jest.Mock).mockReturnValue({ id: "test-id" });
      (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);
      (arrayRemove as jest.Mock).mockReturnValue("mock-array-remove");
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("deleteAttachment"));
      
      await waitFor(() => {
        expect(deleteObject).toHaveBeenCalled();
        expect(updateDoc).toHaveBeenCalledWith(
          expect.anything(),
          {
            anexos: "mock-array-remove",
          }
        );
      });
    });

    it("deve lançar erro quando usuário não está autenticado", async () => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("deleteAttachment"));
      
      await waitFor(() => {
        expect(deleteObject).not.toHaveBeenCalled();
      });
    });
  });

  describe("loadMoreTransactions method", () => {
    it("não deve carregar mais quando não há usuário autenticado", async () => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("loadMore"));
      
      await waitFor(() => {
        expect(getDocs).not.toHaveBeenCalled();
      });
    });
  });

  describe("useTransactions hook", () => {
    it("deve retornar contexto quando usado dentro do provider", () => {
      const { result } = renderHook(() => useTransactions(), {
        wrapper: TransactionsProvider,
      });
      
      expect(result.current).toHaveProperty("transactions");
      expect(result.current).toHaveProperty("balance");
      expect(result.current).toHaveProperty("addTransaction");
      expect(result.current).toHaveProperty("updateTransaction");
      expect(result.current).toHaveProperty("deleteTransactions");
      expect(result.current).toHaveProperty("uploadAttachmentAndUpdateTransaction");
      expect(result.current).toHaveProperty("deleteAttachment");
      expect(result.current).toHaveProperty("loadMoreTransactions");
    });
  });

  describe("Renderização", () => {
    it("deve limpar dados quando usuário não está autenticado", () => {
      (useAuth as jest.Mock).mockReturnValue({ user: null });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      expect(getByTestId("balance").children[0]).toBe("0");
      expect(getByTestId("loading").children[0]).toBe("false");
      expect(getByTestId("transactionsCount").children[0]).toBe("0");
    });
  });
});
