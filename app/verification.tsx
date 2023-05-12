import { Box, Button, Text } from "native-base";
import Header from "../layouts/Header";
import { Link } from "native-base";
import PinInput from "../components/PinInput";

const VerificationScreen = () => {
  return (
    <Box flexGrow={1}>
      <Header title="Verification" />

      <Box mt="auto" p={4}>
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

        <Button mt={12}>Verify</Button>
      </Box>
    </Box>
  );
};

export default VerificationScreen;
