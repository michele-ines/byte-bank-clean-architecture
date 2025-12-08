import type { PreferencesStorage } from "@domain/storage/PreferencesStorage";
import type { WidgetPreferences } from "@shared/ProfileStyles/profile.styles.types";
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  WidgetPreferencesProvider,
  useWidgetPreferences,
} from "./WidgetPreferencesContext";

const defaultMockPrefs: WidgetPreferences = {
  spendingAlert: true,
  savingsGoal: true,
};

const mockGetPreferences = jest.fn();
const mockSetPreferences = jest.fn();

const mockStorage: PreferencesStorage = {
  getPreferences: mockGetPreferences,
  setPreferences: mockSetPreferences,
};

const TestComponent: React.FC = (): JSX.Element => {
  const { preferences, updatePreferences } = useWidgetPreferences();

  const handleUpdateSpendingAlert = (): void => {
    updatePreferences({
      ...preferences,
      spendingAlert: !preferences.spendingAlert,
    });
  };

  const handleUpdateSavingsGoal = (): void => {
    updatePreferences({
      ...preferences,
      savingsGoal: !preferences.savingsGoal,
    });
  };

  const handleUpdateBoth = (): void => {
    updatePreferences({
      spendingAlert: false,
      savingsGoal: false,
    });
  };

  return (
    <View>
      <Text testID="spendingAlert">{preferences.spendingAlert.toString()}</Text>
      <Text testID="savingsGoal">{preferences.savingsGoal.toString()}</Text>
      <TouchableOpacity
        testID="toggleSpendingAlert"
        onPress={handleUpdateSpendingAlert}
      >
        <Text>Toggle Spending Alert</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="toggleSavingsGoal"
        onPress={handleUpdateSavingsGoal}
      >
        <Text>Toggle Savings Goal</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="updateBoth" onPress={handleUpdateBoth}>
        <Text>Update Both</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderWithMockProvider = (
  component: React.ReactElement,
  storage: PreferencesStorage = mockStorage
): ReturnType<typeof render> => {
  return render(
    <WidgetPreferencesProvider storage={storage}>
      {component}
    </WidgetPreferencesProvider>
  );
};

beforeAll((): void => {
  jest.spyOn(console, "error").mockImplementation(jest.fn());
});

afterAll((): void => {
  (console.error as jest.Mock).mockRestore();
});

describe("WidgetPreferencesContext", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
    mockGetPreferences.mockResolvedValue(defaultMockPrefs);
    mockSetPreferences.mockResolvedValue(undefined);
  });

  describe("Carregamento Assíncrono e Persistência", (): void => {
    it("deve carregar as preferências do storage e renderizar o conteúdo", async (): Promise<void> => {
      const initialPrefs = { spendingAlert: false, savingsGoal: true };
      mockGetPreferences.mockResolvedValueOnce(initialPrefs);
      const { queryByTestId, getByTestId } = renderWithMockProvider(
        <TestComponent />
      );
      expect(queryByTestId("spendingAlert")).toBeNull();
      await waitFor(() => {
        expect(getByTestId("spendingAlert").children[0]).toBe("false");
        expect(getByTestId("savingsGoal").children[0]).toBe("true");
      });
      expect(mockGetPreferences).toHaveBeenCalledTimes(1);
    });

    it("deve usar o estado padrão e marcar como carregado em caso de falha no carregamento", async (): Promise<void> => {
      mockGetPreferences.mockRejectedValueOnce(new Error("Storage Error"));
      const { queryByTestId, getByTestId } = renderWithMockProvider(
        <TestComponent />
      );
      expect(queryByTestId("spendingAlert")).toBeNull();
      await waitFor(() => {
        expect(getByTestId("spendingAlert").children[0]).toBe("true");
        expect(getByTestId("savingsGoal").children[0]).toBe("true");
      });
      expect(console.error).toHaveBeenCalled();
    });

    it("deve persistir as preferências usando preferencesStorage.setPreferences ao atualizar", async (): Promise<void> => {
      const { getByTestId } = renderWithMockProvider(<TestComponent />);
      await waitFor(() =>
        expect(getByTestId("spendingAlert").children[0]).toBe("true")
      );
      const toggleButton = getByTestId("toggleSpendingAlert");
      const expectedNewPrefs = { spendingAlert: false, savingsGoal: true };
      act(() => {
        fireEvent.press(toggleButton);
      });
      await waitFor(() => {
        expect(mockSetPreferences).toHaveBeenCalledTimes(1);
      });
      expect(mockSetPreferences).toHaveBeenCalledWith(expectedNewPrefs);
    });
  });

  describe("updatePreferences method", (): void => {
    it("deve atualizar preferência de spendingAlert", async (): Promise<void> => {
      const { getByTestId } = renderWithMockProvider(<TestComponent />);
      await waitFor(() =>
        expect(getByTestId("spendingAlert").children[0]).toBe("true")
      );
      fireEvent.press(getByTestId("toggleSpendingAlert"));
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");
    });

    it("deve atualizar ambas as preferências simultaneamente", async (): Promise<void> => {
      const { getByTestId } = renderWithMockProvider(<TestComponent />);
      await waitFor(() =>
        expect(getByTestId("spendingAlert").children[0]).toBe("true")
      );
      fireEvent.press(getByTestId("updateBoth"));
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("false");
    });
  });

  describe("useWidgetPreferences hook", (): void => {
    it("deve lançar erro quando usado fora do provider", (): void => {
      const TestHookComponent: React.FC = (): JSX.Element => {
        useWidgetPreferences();
        return <Text>Test</Text>;
      };
      expect(() => render(<TestHookComponent />)).toThrow(
        "useWidgetPreferences deve ser usado dentro de WidgetPreferencesProvider"
      );
    });

    it("deve retornar contexto e o estado padrão após carregamento", async (): Promise<void> => {
      const { result } = renderHook(() => useWidgetPreferences(), {
        wrapper: ({ children }) => (
          <WidgetPreferencesProvider storage={mockStorage}>
            {children}
          </WidgetPreferencesProvider>
        ),
      });
      await waitFor(() => {
        expect(result.current.preferences).toEqual({
          spendingAlert: true,
          savingsGoal: true,
        });
      });
      expect(result.current).toHaveProperty("preferences");
      expect(result.current).toHaveProperty("updatePreferences");
      expect(typeof result.current.updatePreferences).toBe("function");
    });
  });
});
