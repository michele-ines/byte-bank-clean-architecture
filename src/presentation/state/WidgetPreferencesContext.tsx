import type { PreferencesStorage } from "@domain/storage/PreferencesStorage";
import { AsyncStoragePreferences } from "@infrastructure/persistence/AsyncStoragePreferences";
import type {
  WidgetPreferences,
  WidgetPreferencesContextType,
} from "@shared/ProfileStyles/profile.styles.types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WidgetPreferencesContext = createContext<
  WidgetPreferencesContextType | undefined
>(undefined);

export const WidgetPreferencesProvider: React.FC<{
  children: React.ReactNode;
  storage?: PreferencesStorage;
}> = ({ children, storage }) => {
  const preferencesStorage = useMemo(
    () => storage ?? new AsyncStoragePreferences(),
    [storage]
  );
  const [preferences, setPreferences] = useState<WidgetPreferences>({
    spendingAlert: true,
    savingsGoal: true,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadPreferences = async (): Promise<void> => {
      try {
        const loaded = await preferencesStorage.getPreferences();
        setPreferences(loaded);
      } catch (error) {
        console.error("Erro ao carregar preferências:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    void loadPreferences();
  }, [preferencesStorage]);

  const updatePreferences = useCallback(
    (newPrefs: WidgetPreferences): void => {
      setPreferences(newPrefs);
      void preferencesStorage.setPreferences(newPrefs);
    },
    [preferencesStorage]
  );

  const contextValue = useMemo(
    () => ({ preferences, updatePreferences }),
    [preferences, updatePreferences]
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <WidgetPreferencesContext.Provider value={contextValue}>
      {children}
    </WidgetPreferencesContext.Provider>
  );
};

export function useWidgetPreferences(): WidgetPreferencesContextType {
  const context = useContext(WidgetPreferencesContext);
  if (!context) {
    throw new Error(
      "useWidgetPreferences deve ser usado dentro de WidgetPreferencesProvider"
    );
  }
  return context;
}
