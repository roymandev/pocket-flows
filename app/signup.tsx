import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  Text,
  useTheme,
} from "native-base";
import Header from "../layouts/Header";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import IconGoogle from "../assets/icons/google.svg";

const SignUpPage = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <Header title="Sign Up" />

      <Box px={4} mt="56px">
        <FormControl>
          <Input placeholder="Name" />
        </FormControl>

        <FormControl mt={6}>
          <Input placeholder="Email" />
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
          />
        </FormControl>

        <FormControl mt={4}>
          <Checkbox
            value="agree"
            accessibilityLabel="By signing up, you agree to the Terms of Service and Privacy Policy"
          >
            <Text _android={{ pr: 5 }} _ios={{ pr: 5 }} lineHeight="md">
              By signing up, you agree to the{" "}
              <Link href="/tos" style={{ color: theme.colors.primary[100] }}>
                Terms of Service and Privacy Policy
              </Link>
            </Text>
          </Checkbox>
        </FormControl>

        <Button mt={7}>Sign Up</Button>
        <Text textAlign="center" my={3} fontWeight="bold" color="light.20">
          Or with
        </Text>
        <Button variant="outline" leftIcon={<IconGoogle />}>
          Sign Up with Google
        </Button>

        <Text textAlign="center" mt={5} fontWeight="medium" color="light.20">
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: theme.colors.primary[100],
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
            }}
          >
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default SignUpPage;