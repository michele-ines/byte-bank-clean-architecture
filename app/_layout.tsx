import { toastConfig } from "@infrastructure/config/Toast.config";
import { GlobalContextProvider } from "@presentation/state";
import { WidgetPreferencesProvider } from "@presentation/state/WidgetPreferencesContext";
import { layout } from "@presentation/theme";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: layout.flex1 }}>
      <SafeAreaProvider>
        <GlobalContextProvider>
          <WidgetPreferencesProvider>
            <Slot />
            <Toast config={toastConfig} />
          </WidgetPreferencesProvider>
        </GlobalContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
