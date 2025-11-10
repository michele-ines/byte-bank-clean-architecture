import type { WidgetPreferences, WidgetPreferencesContextType } from "@shared/ProfileStyles/profile.styles.types";
import React, { createContext, useContext, useState } from "react";

const WidgetPreferencesContext = createContext<WidgetPreferencesContextType | undefined>(undefined);

export const WidgetPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<WidgetPreferences>({
    spendingAlert: true,
    savingsGoal: true,
  });

  function updatePreferences(newPrefs: WidgetPreferences): void {
    setPreferences(newPrefs);
  }

  return (
    <WidgetPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </WidgetPreferencesContext.Provider>
  );
};

export function useWidgetPreferences(): WidgetPreferencesContextType {
  const context = useContext(WidgetPreferencesContext);
  if (!context) {
    throw new Error("useWidgetPreferences deve ser usado dentro de WidgetPreferencesProvider");
  }
  return context;
}
