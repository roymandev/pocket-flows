import { Slot, SplashScreen } from "expo-router";
import { Box, KeyboardAvoidingView, NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import { customTheme } from "../theme";
import {
  useFonts,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Platform } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const RootLayout = () => {
  const [loaded, error] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) return <SplashScreen />;

  return (
    <NativeBaseProvider theme={customTheme}>
      <Box safeArea flexGrow={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          flexGrow={1}
        >
          <Slot />
        </KeyboardAvoidingView>
      </Box>
    </NativeBaseProvider>
  );
};

export default RootLayout;
