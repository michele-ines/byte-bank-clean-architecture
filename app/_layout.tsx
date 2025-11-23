import { toastConfig } from "@/presentation/config/Toast.config";
import { GlobalContextProvider } from "@presentation/state";
import { LoggerProvider } from "@presentation/state/LoggerContext";
import { WidgetPreferencesProvider } from "@presentation/state/WidgetPreferencesContext";
import { layout } from "@presentation/theme";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import type { JSX } from "react";

export default function RootLayout(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: layout.flex1 }}>
      <SafeAreaProvider>
        <LoggerProvider>
          <GlobalContextProvider>
            <WidgetPreferencesProvider>
              <Slot />
              <Toast config={toastConfig} />
            </WidgetPreferencesProvider>
          </GlobalContextProvider>
        </LoggerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}