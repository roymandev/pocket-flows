import { Button, FormControl, Heading, Input, ScrollView } from "native-base";
import Header from "../../layouts/Header";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "expo-router";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    let isValid = true;

    if (!email) {
      setError("Email is required");
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Invalid email");
      isValid = false;
    }

    return isValid;
  };

  const onSubmitHanlder = async () => {
    if (!validate()) return;

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError(error.message);
    } else {
      router.push({
        pathname: "/verification",
        params: {
          email,
          type: "recovery",
        },
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Header title="Forgot Password" />

      <ScrollView px={4}>
        <Heading size={2} mt={69}>
          Don't worry. {"\n"}Enter your email and we'll send you a link to reset
          your password.
        </Heading>

        <FormControl mt={12} isInvalid={!!error}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setError("");
            }}
          />
          <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
        </FormControl>

        <Button my={8} onPress={onSubmitHanlder} isLoading={loading}>
          Continue
        </Button>
      </ScrollView>
    </>
  );
};

export default ForgotPasswordPage;
