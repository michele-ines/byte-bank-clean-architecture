import { toastConfig } from "@/src/config/Toast.config";
import { GlobalContextProvider } from "@/src/contexts";
import { WidgetPreferencesProvider } from "@/src/contexts/WidgetPreferencesContext";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
