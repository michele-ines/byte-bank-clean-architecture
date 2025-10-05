import { fireEvent, render, renderHook } from "@testing-library/react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WidgetPreferencesProvider, useWidgetPreferences } from "./WidgetPreferencesContext";

// ▶️ Silencia console.error
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

// ▶️ Helper para criar um componente de teste
const TestComponent = () => {
  const { preferences, updatePreferences } = useWidgetPreferences();

  const handleUpdateSpendingAlert = () => {
    updatePreferences({
      ...preferences,
      spendingAlert: !preferences.spendingAlert,
    });
  };

  const handleUpdateSavingsGoal = () => {
    updatePreferences({
      ...preferences,
      savingsGoal: !preferences.savingsGoal,
    });
  };

  const handleUpdateBoth = () => {
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

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <WidgetPreferencesProvider>
      {component}
    </WidgetPreferencesProvider>
  );
};

describe("WidgetPreferencesContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("updatePreferences method", () => {
    it("deve atualizar preferência de spendingAlert", () => {
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      // Verifica estado inicial
      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      
      // Atualiza preferência
      fireEvent.press(getByTestId("toggleSpendingAlert"));
      
      // Verifica se foi atualizada
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("true"); // Não deve alterar
    });

    it("deve atualizar preferência de savingsGoal", () => {
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      // Verifica estado inicial
      expect(getByTestId("savingsGoal").children[0]).toBe("true");
      
      // Atualiza preferência
      fireEvent.press(getByTestId("toggleSavingsGoal"));
      
      // Verifica se foi atualizada
      expect(getByTestId("savingsGoal").children[0]).toBe("false");
      expect(getByTestId("spendingAlert").children[0]).toBe("true"); // Não deve alterar
    });

    it("deve atualizar ambas as preferências simultaneamente", () => {
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      // Verifica estado inicial
      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");
      
      // Atualiza ambas preferências
      fireEvent.press(getByTestId("updateBoth"));
      
      // Verifica se ambas foram atualizadas
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("false");
    });

    it("deve permitir múltiplas atualizações consecutivas", () => {
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      // Estado inicial: ambos true
      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");
      
      // Primeira atualização - toggle spendingAlert
      fireEvent.press(getByTestId("toggleSpendingAlert"));
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");
      
      // Segunda atualização - toggle savingsGoal
      fireEvent.press(getByTestId("toggleSavingsGoal"));
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("savingsGoal").children[0]).toBe("false");
      
      // Terceira atualização - toggle spendingAlert novamente
      fireEvent.press(getByTestId("toggleSpendingAlert"));
      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      expect(getByTestId("savingsGoal").children[0]).toBe("false");
    });
  });

  describe("useWidgetPreferences hook", () => {
    it("deve lançar erro quando usado fora do provider", () => {
      // Criar um componente que usa o hook fora do provider
      const TestHookComponent = () => {
        useWidgetPreferences();
        return <Text>Test</Text>;
      };
      
      expect(() => render(<TestHookComponent />)).toThrow("useWidgetPreferences deve ser usado dentro de WidgetPreferencesProvider");
    });

    it("deve retornar contexto quando usado dentro do provider", () => {
      const { result } = renderHook(() => useWidgetPreferences(), {
        wrapper: WidgetPreferencesProvider,
      });
      
      expect(result.current).toHaveProperty("preferences");
      expect(result.current).toHaveProperty("updatePreferences");
      expect(typeof result.current.updatePreferences).toBe("function");
    });

    it("deve retornar preferências com valores padrão corretos", () => {
      const { result } = renderHook(() => useWidgetPreferences(), {
        wrapper: WidgetPreferencesProvider,
      });
      
      expect(result.current.preferences).toEqual({
        spendingAlert: true,
        savingsGoal: true,
      });
    });
  });

  describe("Renderização e estado inicial", () => {
    it("deve renderizar com estado inicial correto", () => {
      const { getByTestId } = renderWithProvider(<TestComponent />);
      
      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      expect(getByTestId("savingsGoal").children[0]).toBe("true");
    });

    it("deve permitir múltiplos componentes compartilharem o mesmo estado", () => {
      const SecondTestComponent = () => {
        const { preferences } = useWidgetPreferences();
        return (
          <View>
            <Text testID="secondSpendingAlert">{preferences.spendingAlert.toString()}</Text>
            <Text testID="secondSavingsGoal">{preferences.savingsGoal.toString()}</Text>
          </View>
        );
      };

      const CombinedComponent = () => (
        <View>
          <TestComponent />
          <SecondTestComponent />
        </View>
      );

      const { getByTestId } = renderWithProvider(<CombinedComponent />);
      
      // Verifica estado inicial em ambos componentes
      expect(getByTestId("spendingAlert").children[0]).toBe("true");
      expect(getByTestId("secondSpendingAlert").children[0]).toBe("true");
      
      // Atualiza no primeiro componente
      fireEvent.press(getByTestId("toggleSpendingAlert"));
      
      // Verifica se ambos componentes refletem a mudança
      expect(getByTestId("spendingAlert").children[0]).toBe("false");
      expect(getByTestId("secondSpendingAlert").children[0]).toBe("false");
    });
  });
});
