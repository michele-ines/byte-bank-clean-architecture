import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalContextProvider } from "../src/contexts";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GlobalContextProvider>
          <Slot />
        </GlobalContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
