import { Slot, SplashScreen, Stack } from "expo-router";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useEffect } from "react";
import { themeConfig } from "../utils/themeConfig";
import {
  useFonts,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

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

  const theme = extendTheme(themeConfig);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) return <SplashScreen />;

  return (
    <NativeBaseProvider theme={theme}>
      <Slot />
    </NativeBaseProvider>
  );
};

export default RootLayout;
