import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalContextProvider } from "../src/contexts";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalContextProvider>
        <Slot />
      </GlobalContextProvider>
    </GestureHandlerRootView>
  );
}
