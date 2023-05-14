import { Box, Button } from "native-base";
import OnboardingCarousel from "../components/OnboardingCarousel";
import { Redirect, useRouter } from "expo-router";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";

const OnboardingPage = () => {
  const router = useRouter();
  const user = useContext(UserContext);

  if (user) return <Redirect href="/home" />;

  return (
    <>
      <OnboardingCarousel />

      <Box p={3}>
        <Button mb={4} onPress={() => router.push("/signup")}>
          Sign Up
        </Button>
        <Button variant="light" onPress={() => router.push("/login")}>
          Login
        </Button>
      </Box>
    </>
  );
};

export default OnboardingPage;
