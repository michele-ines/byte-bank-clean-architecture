import { fireEvent, render, renderHook } from "@testing-library/react-native";
import type { JSX } from "react";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WidgetPreferencesProvider, useWidgetPreferences } from "./WidgetPreferencesContext";

beforeAll((): void => {
  jest.spyOn(console, "error").mockImplementation(jest.fn());
});

afterAll((): void => {
  (console.error as jest.Mock).mockRestore();
});

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

      <TouchableOpacity testID="toggleSpendingAlert" onPress={handleUpdateSpendingAlert}>
        <Text>Toggle Spending Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity testID="toggleSavingsGoal" onPress={handleUpdateSavingsGoal}>
        <Text>Toggle Savings Goal</Text>
      </TouchableOpacity>

      <TouchableOpacity testID="updateBoth" onPress={handleUpdateBoth}>
        <Text>Update Both</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderWithProvider = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<WidgetPreferencesProvider>{component}</WidgetPreferencesProvider>);
};

describe("WidgetPreferencesContext", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  describe("updatePreferences method", (): void => {
    it("deve atualizar preferência de spendingAlert", (): void => {
      const { getByTestId } = renderWithProvider(<TestComponent />);

      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      fireEvent.press(getByTestId("toggleSpendingAlert"));
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");
    });

    it("deve atualizar preferência de savingsGoal", (): void => {
      const { getByTestId } = renderWithProvider(<TestComponent />);

      expect(getByTestId("savingsGoal").children[0]).toBe("true");
      fireEvent.press(getByTestId("toggleSavingsGoal"));
      expect(getByTestId("savingsGoal").children[0]).toBe("false");
      expect(getByTestId("spendingAlert").children[0]).toBe("true");
    });

    it("deve atualizar ambas as preferências simultaneamente", (): void => {
      const { getByTestId } = renderWithProvider(<TestComponent />);

      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");
      fireEvent.press(getByTestId("updateBoth"));
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("false");
    });

    it("deve permitir múltiplas atualizações consecutivas", (): void => {
      const { getByTestId } = renderWithProvider(<TestComponent />);

      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");

      fireEvent.press(getByTestId("toggleSpendingAlert"));
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");

      fireEvent.press(getByTestId("toggleSavingsGoal"));
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("false");

      fireEvent.press(getByTestId("toggleSpendingAlert"));
      expect(getByTestId("spendingAlert").children[0]).toBe("true");
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

    it("deve retornar contexto quando usado dentro do provider", (): void => {
      const { result } = renderHook(() => useWidgetPreferences(), {
        wrapper: WidgetPreferencesProvider,
      });

      expect(result.current).toHaveProperty("preferences");
      expect(result.current).toHaveProperty("updatePreferences");
      expect(typeof result.current.updatePreferences).toBe("function");
    });

    it("deve retornar preferências com valores padrão corretos", (): void => {
      const { result } = renderHook(() => useWidgetPreferences(), {
        wrapper: WidgetPreferencesProvider,
      });

      expect(result.current.preferences).toEqual({
        spendingAlert: true,
        savingsGoal: true,
      });
    });
  });

  describe("Renderização e estado inicial", (): void => {
    it("deve renderizar com estado inicial correto", (): void => {
      const { getByTestId } = renderWithProvider(<TestComponent />);

      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");
    });

    it("deve permitir múltiplos componentes compartilharem o mesmo estado", (): void => {
      const SecondTestComponent: React.FC = (): JSX.Element => {
        const { preferences } = useWidgetPreferences();
        return (
          <View>
            <Text testID="secondSpendingAlert">{preferences.spendingAlert.toString()}</Text>
            <Text testID="secondSavingsGoal">{preferences.savingsGoal.toString()}</Text>
          </View>
        );
      };

      const CombinedComponent: React.FC = (): JSX.Element => (
        <View>
          <TestComponent />
          <SecondTestComponent />
        </View>
      );

      const { getByTestId } = renderWithProvider(<CombinedComponent />);

      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      expect(getByTestId("secondSpendingAlert").children[0]).toBe("true");

      fireEvent.press(getByTestId("toggleSpendingAlert"));

      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("secondSpendingAlert").children[0]).toBe("false");
    });
  });
});
