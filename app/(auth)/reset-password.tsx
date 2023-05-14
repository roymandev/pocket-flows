import { Button, FormControl, Input, ScrollView, Text } from "native-base";
import Header from "../../layouts/Header";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "expo-router";

const INITIAL_FORM_ERRORS = {
  password: "",
  confirmPassword: "",
};

const ResetPasswordPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState(INITIAL_FORM_ERRORS);

  const validate = () => {
    let isValid = true;
    const errors = { ...INITIAL_FORM_ERRORS };

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const onSubmitHanlder = async () => {
    if (!validate()) return;

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: password });

    if (error) {
      setError(error.message);
    } else {
      router.replace("/home");
    }

    setLoading(false);
  };

  return (
    <>
      <Header title="Reset Password" />

      <ScrollView px={4}>
        <FormControl mt="56px" isInvalid={!!formErrors.password}>
          <Input
            placeholder="New Password"
            type="password"
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              if (formErrors.password)
                setFormErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          <FormControl.ErrorMessage>
            {formErrors.password}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl mt={6} mb={4} isInvalid={!!formErrors.confirmPassword}>
          <Input
            placeholder="Retype New Password"
            type="password"
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
              if (formErrors.confirmPassword)
                setFormErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }}
          />
          <FormControl.ErrorMessage>
            {formErrors.confirmPassword}
          </FormControl.ErrorMessage>
        </FormControl>

        {error && (
          <Text textAlign="center" color="red.500">
            {error}
          </Text>
        )}

        <Button mt={4} isLoading={loading} onPress={onSubmitHanlder}>
          Continue
        </Button>
      </ScrollView>
    </>
  );
};

export default ResetPasswordPage;
