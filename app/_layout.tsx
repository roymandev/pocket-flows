import { Slot, SplashScreen } from "expo-router";
import {
  Box,
  KeyboardAvoidingView,
  NativeBaseProvider,
  StatusBar,
} from "native-base";
import { useEffect, useState } from "react";
import { customTheme } from "../theme";
import {
  useFonts,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Platform } from "react-native";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { UserContext } from "../utils/UserContext";

export { ErrorBoundary } from "expo-router";

const RootLayout = () => {
  const [loaded, error] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!loaded || loading) return <SplashScreen />;

  return (
    <NativeBaseProvider theme={customTheme}>
      <UserContext.Provider value={user!}>
        <StatusBar barStyle="dark-content" />
        <Box safeArea flexGrow={1}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            flexGrow={1}
          >
            <Slot />
          </KeyboardAvoidingView>
        </Box>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
};

export default RootLayout;
