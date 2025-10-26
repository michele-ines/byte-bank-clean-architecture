import { fireEvent, render, renderHook, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { onSnapshot, setDoc } from "firebase/firestore";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthProvider, useAuth } from "./AuthContext";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(() => "mock-doc-ref"),
  setDoc: jest.fn(),
  onSnapshot: jest.fn(),
  serverTimestamp: jest.fn(() => ({ seconds: 1234567890, nanoseconds: 0 })),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("../config/firebaseConfig", () => ({
  auth: {},
  db: {},
}));

const TestComponent = () => {
  const {
    user,
    userData,
    isAuthenticated,
    loading,
    signup,
    login,
    resetPassword,
    signOut: handleSignOut,
  } = useAuth();

  const [error, setError] = React.useState<string | null>(null);

  const handleSignup = async () => {
    try {
      await signup("test@example.com", "password123", "Test User");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleLogin = async () => {
    try {
      await login("test@example.com", "password123");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword("test@example.com");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSignOutClick = async () => {
    try {
      await handleSignOut();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <View>
      <Text testID="isAuthenticated">{isAuthenticated.toString()}</Text>
      <Text testID="loading">{loading.toString()}</Text>
      <Text testID="userExists">{user ? "true" : "false"}</Text>
      <Text testID="userDataExists">{userData ? "true" : "false"}</Text>
      {error && <Text testID="error">{error}</Text>}
      
      <TouchableOpacity testID="signup" onPress={handleSignup}>
        <Text>Signup</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="login" onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="resetPassword" onPress={handleResetPassword}>
        <Text>Reset Password</Text>
      </TouchableOpacity>
      
      <TouchableOpacity testID="signOut" onPress={handleSignOutClick}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock padrão para onAuthStateChanged
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null); // Simula usuário não autenticado
      return jest.fn(); // unsubscribe function
    });
    
    // Mock padrão para onSnapshot
    (onSnapshot as jest.Mock).mockImplementation((docRef, callback) => {
      callback({ exists: () => false }); // Simula documento não existe
      return jest.fn(); // unsubscribe function
    });
  });

  describe("signup method", () => {
    it("deve criar conta com sucesso", async () => {
      const mockUser = { uid: "test-user-id" };
      const mockUserCredential = { user: mockUser };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUserCredential);
      (setDoc as jest.Mock).mockResolvedValueOnce(undefined);
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("signup"));
      
      await waitFor(() => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
          expect.anything(), // auth
          "test@example.com",
          "password123"
        );
        expect(setDoc).toHaveBeenCalledWith(
          expect.anything(), // doc reference
          {
            uuid: "test-user-id",
            name: "Test User",
            email: "test@example.com",
            createdAt: expect.anything(),
          }
        );
      });
    });

    it("deve mostrar erro quando signup falha", async () => {
      const error = new Error("Email already in use");
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error);
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("signup"));
      
      await waitFor(() => {
        expect(getByTestId("error")).toBeTruthy();
        expect(getByTestId("error").children[0]).toBe("Email already in use");
      });
      
      expect(setDoc).not.toHaveBeenCalled();
    });
  });

  describe("login method", () => {
    it("deve fazer login com sucesso", async () => {
      const mockUserCredential = { user: { uid: "test-user-id" } };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUserCredential);
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("login"));
      
      await waitFor(() => {
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
          expect.anything(), // auth
          "test@example.com",
          "password123"
        );
      });
    });

    it("deve mostrar erro quando login falha", async () => {
      const error = new Error("Invalid credentials");
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error);
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("login"));
      
      await waitFor(() => {
        expect(getByTestId("error")).toBeTruthy();
        expect(getByTestId("error").children[0]).toBe("Invalid credentials");
      });
    });
  });

  describe("resetPassword method", () => {
    it("deve enviar email de reset com sucesso", async () => {
      (sendPasswordResetEmail as jest.Mock).mockResolvedValueOnce(undefined);
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("resetPassword"));
      
      await waitFor(() => {
        expect(sendPasswordResetEmail).toHaveBeenCalledWith(
          expect.anything(), // auth
          "test@example.com"
        );
      });
    });

    it("deve mostrar erro quando reset falha", async () => {
      const error = new Error("User not found");
      (sendPasswordResetEmail as jest.Mock).mockRejectedValueOnce(error);
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("resetPassword"));
      
      await waitFor(() => {
        expect(getByTestId("error")).toBeTruthy();
        expect(getByTestId("error").children[0]).toBe("User not found");
      });
    });
  });

  describe("handleSignOut method", () => {
    it("deve fazer logout com sucesso e navegar", async () => {
      (signOut as jest.Mock).mockResolvedValueOnce(undefined);
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("signOut"));
      
      await waitFor(() => {
        expect(signOut).toHaveBeenCalledWith(expect.anything()); // auth
        expect(router.replace).toHaveBeenCalledWith("/");
      });
    });

    it("deve capturar erro quando logout falha", async () => {
      const error = new Error("Logout failed");
      (signOut as jest.Mock).mockRejectedValueOnce(error);
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      fireEvent.press(getByTestId("signOut"));
      
      await waitFor(() => {
        expect(signOut).toHaveBeenCalled();
      });
      
      expect(router.replace).not.toHaveBeenCalled();
    });
  });

  describe("useAuth hook", () => {
    it("deve retornar contexto quando usado dentro do provider", () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });
      
      expect(result.current).toHaveProperty("user");
      expect(result.current).toHaveProperty("userData");
      expect(result.current).toHaveProperty("isAuthenticated");
      expect(result.current).toHaveProperty("loading");
      expect(result.current).toHaveProperty("signup");
      expect(result.current).toHaveProperty("login");
      expect(result.current).toHaveProperty("resetPassword");
      expect(result.current).toHaveProperty("signOut");
    });
  });

  describe("Renderização e estado inicial", () => {
    it("deve renderizar com estado inicial correto", () => {
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      expect(getByTestId("isAuthenticated").children[0]).toBe("false");
      expect(getByTestId("loading").children[0]).toBe("false");
      expect(getByTestId("userExists").children[0]).toBe("false");
      expect(getByTestId("userDataExists").children[0]).toBe("false");
    });

    it("deve mostrar usuário autenticado quando há usuário", () => {
      const mockUser = { uid: "test-user-id", email: "test@example.com" };
      (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
        callback(mockUser);
        return jest.fn();
      });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      expect(getByTestId("isAuthenticated").children[0]).toBe("true");
      expect(getByTestId("userExists").children[0]).toBe("true");
    });

    it("deve mostrar userData quando documento existe", () => {
      const mockUser = { uid: "test-user-id", email: "test@example.com" };
      const mockUserData = { name: "Test User", email: "test@example.com" };
      
      (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
        callback(mockUser);
        return jest.fn();
      });
      
      (onSnapshot as jest.Mock).mockImplementation((docRef, callback) => {
        callback({
          exists: () => true,
          data: () => mockUserData,
        });
        return jest.fn();
      });
      
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      expect(getByTestId("userDataExists").children[0]).toBe("true");
    });
  });
});
