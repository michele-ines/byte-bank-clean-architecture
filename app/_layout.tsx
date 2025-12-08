import { queryClient } from "@/infrastructure/config/react-query-client";
import { toastConfig } from "@/presentation/config/Toast.config";
import { GlobalContextProvider } from "@presentation/state";
import { LoggerProvider } from "@presentation/state/LoggerContext";
import { WidgetPreferencesProvider } from "@presentation/state/WidgetPreferencesContext";
import { layout } from "@presentation/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import type { JSX } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: layout.flex1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <LoggerProvider>
            <GlobalContextProvider>
              <WidgetPreferencesProvider>
                <Slot />
                <Toast config={toastConfig} />
              </WidgetPreferencesProvider>
            </GlobalContextProvider>
          </LoggerProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
