import { Button, ScrollView, Text } from "native-base";
import Header from "../layouts/Header";
import { Link } from "native-base";
import PinInput from "../components/PinInput";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { supabase } from "../utils/supabase";

const VerificationScreen = () => {
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [token, setToken] = useState("");

  const submitTokenHandler = async () => {
    if (typeof email !== "string") return;
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      setError(error.message);
    } else {
      router.replace({
        pathname: "/success",
        params: {
          redirect: "/home",
        },
      });
    }

    setLoading(false);
  };

  if (!email) return <Redirect href="/" />;

  return (
    <>
      <Header title="Verification" />

      <ScrollView
        px={4}
        flexGrow={1}
        _contentContainerStyle={{
          justifyContent: "flex-end",
          flexGrow: 1,
          py: 10,
        }}
      >
        <Text fontSize={36} fontWeight="medium" lineHeight={44}>
          Enter your Verification Code
        </Text>

        <PinInput
          length={6}
          mt={12}
          mb={6}
          autoFocus
          value={token}
          onChange={(token) => {
            setError("");
            setToken(token);
          }}
        />

        {error && (
          <Text textAlign="center" color="red.500">
            {error}
          </Text>
        )}

        <Text mt={6} fontSize="md">
          We send verification code to your email{" "}
          <Text color="primary.100">{email}</Text>. You can check your inbox.
        </Text>

        <Link mt={4}>I didn't received the code? Send again</Link>

        <Button
          mt={12}
          onPress={submitTokenHandler}
          isDisabled={token.length < 6}
          isLoading={loading}
        >
          Verify
        </Button>
      </ScrollView>
    </>
  );
};

export default VerificationScreen;
