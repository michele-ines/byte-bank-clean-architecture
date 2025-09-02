import { tokens } from "@/src/theme/tokens";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast, { BaseToast } from 'react-native-toast-message';
import { GlobalContextProvider } from "../src/contexts";
   const toastConfig = {
    error: (props: any) => (
      <BaseToast
        {...props}
        style={{ 
          backgroundColor: tokens.byteColorError,
          borderLeftWidth: 0,
          width: '90%',
          borderRadius: 8,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: tokens.gradientTealTo,
        }}
        text2Style={{
          fontSize: 14,
          color:  tokens.gradientTealTo,
        }}
      />
    ),
    
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          backgroundColor: tokens.byteColorGreen500, 
          borderLeftWidth: 0,
          width: '90%',
          borderRadius: 8,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: tokens.gradientTealTo, 
        }}
        text2Style={{
          fontSize: 14,
          color: tokens.gradientTealTo, 
        }}
      />
    ),
  };
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GlobalContextProvider>
          <Slot />
          <Toast config={toastConfig} />
        </GlobalContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
