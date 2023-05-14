import { Button, ScrollView, Text } from "native-base";
import Header from "../../layouts/Header";
import { Link } from "native-base";
import PinInput from "../../components/PinInput";
import { useRouter } from "expo-router";

const VerificationScreen = () => {
  const router = useRouter();

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

        <PinInput length={6} mt={12} autoFocus />

        <Text mt={12} fontSize="md">
          We send verification code to your email{" "}
          <Text color="primary.100">brajaoma*****@gmail.com</Text>. You can
          check your inbox.
        </Text>

        <Link mt={4}>I didn't received the code? Send again</Link>

        <Button mt={12} onPress={() => router.replace("/login")}>
          Verify
        </Button>
      </ScrollView>
    </>
  );
};

export default VerificationScreen;
