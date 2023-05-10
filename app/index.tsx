import { Box, Button, Center, View } from "native-base";
import OnboardingCarousel from "../components/OnboardingCarousel";
import { useRouter } from "expo-router";

const OnboardingPage = () => {
  const router = useRouter();

  return (
    <View flexGrow={1}>
      <OnboardingCarousel />

      <Box p={3}>
        <Button mb={4} onPress={() => router.push("/signup")}>
          Sign Up
        </Button>
        <Button variant="light" onPress={() => router.push("/login")}>
          Login
        </Button>
      </Box>
    </View>
  );
};

export default OnboardingPage;
