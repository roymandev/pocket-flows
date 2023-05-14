import {
  Button,
  FormControl,
  Input,
  ScrollView,
  Text,
  useTheme,
} from "native-base";
import Header from "../../layouts/Header";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import IconGoogle from "../../assets/icons/google.svg";
import { supabase } from "../../utils/supabase";

const LoginPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmail = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.replace("/home");
    }

    setLoading(false);
  };

  return (
    <>
      <Header title="Login" />

      <ScrollView px={4}>
        <FormControl mt="56px">
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </FormControl>

        <FormControl mt={6}>
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            InputRightElement={
              <Button
                variant="unstyled"
                onPress={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Feather name="eye" size={24} />
                ) : (
                  <Feather
                    name="eye-off"
                    size={24}
                    color={theme.colors.light[20] as string}
                  />
                )}
              </Button>
            }
            value={password}
            onChangeText={setPassword}
          />
        </FormControl>

        {error && (
          <Text mt={3} textAlign="center" color="red.500">
            {error}
          </Text>
        )}

        <Text textAlign="right" mt={3}>
          <Link
            href="/login"
            style={{
              color: theme.colors.primary[100],
              textDecorationLine: "underline",
            }}
          >
            Forgot Password?
          </Link>
        </Text>

        <Button
          mt={3}
          onPress={signInWithEmail}
          isLoading={loading}
          isDisabled={!email || !password}
        >
          Login
        </Button>
        <Text textAlign="center" my={3} fontWeight="bold" color="light.20">
          Or with
        </Text>
        <Button variant="outline" leftIcon={<IconGoogle />}>
          Login with Google
        </Button>

        <Text textAlign="center" my={5} fontWeight="medium" color="light.20">
          Don't have an account yet?{" "}
          <Link
            href="/signup"
            style={{
              color: theme.colors.primary[100],
              textDecorationLine: "underline",
            }}
          >
            Sign Up
          </Link>
        </Text>
      </ScrollView>
    </>
  );
};

export default LoginPage;
