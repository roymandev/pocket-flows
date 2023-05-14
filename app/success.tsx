import { Center, Text } from "native-base";
import Success from "../assets/icons/success.svg";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

const success = () => {
  const { redirect } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof redirect !== "string") return;

    setTimeout(() => router.replace(redirect), 2000);
  }, []);

  if (typeof redirect !== "string") return <Redirect href="/" />;

  return (
    <Center flexGrow={1}>
      <Success />
      <Text mt={4} fontSize={24} fontWeight="medium">
        You are set!
      </Text>
    </Center>
  );
};

export default success;
