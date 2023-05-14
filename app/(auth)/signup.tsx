import {
  Button,
  Checkbox,
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

const SignUpPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const signUpHanlder = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      router.push({
        pathname: "/verification",
        params: {
          email,
          type: "email",
        },
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Header title="Sign Up" />

      <ScrollView px={4}>
        <FormControl mt="56px">
          <Input placeholder="Name" value={name} onChangeText={setName} />
        </FormControl>

        <FormControl mt={6}>
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

        <FormControl mt={4}>
          <Checkbox
            value="agree"
            isChecked={acceptTerms}
            onChange={setAcceptTerms}
            accessibilityLabel="By signing up, you agree to the Terms of Service and Privacy Policy"
          >
            <Text _android={{ pr: 9 }} _ios={{ pr: 9 }} lineHeight="md">
              By signing up, you agree to the{" "}
              <Link href="/tos" style={{ color: theme.colors.primary[100] }}>
                Terms of Service and Privacy Policy
              </Link>
            </Text>
          </Checkbox>
        </FormControl>

        {error && (
          <Text mt={3} textAlign="center" color="red.500">
            {error}
          </Text>
        )}

        <Button
          mt={7}
          onPress={signUpHanlder}
          isLoading={loading}
          isDisabled={!name || !email || !password || !acceptTerms}
        >
          Sign Up
        </Button>
        <Text textAlign="center" my={3} fontWeight="bold" color="light.20">
          Or with
        </Text>
        <Button variant="outline" leftIcon={<IconGoogle />}>
          Sign Up with Google
        </Button>

        <Text textAlign="center" my={5} fontWeight="medium" color="light.20">
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: theme.colors.primary[100],
              textDecorationLine: "underline",
            }}
          >
            Login
          </Link>
        </Text>
      </ScrollView>
    </>
  );
};

export default SignUpPage;
