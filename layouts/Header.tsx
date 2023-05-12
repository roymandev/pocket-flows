import { Box, Button, HStack, Heading } from "native-base";
import ArrowLeft from "../assets/icons/arrow-left.svg";
import { useRouter } from "expo-router";
import { ComponentPropsWithoutRef } from "react";

type HeaderProps = {
  title: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
} & ComponentPropsWithoutRef<typeof HStack>;

const Header = ({ title, leftItem, rightItem, ...rest }: HeaderProps) => {
  const router = useRouter();

  return (
    <HStack
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      h={16}
      px={4}
      {...rest}
    >
      <Box w={8}>
        <Button variant="unstyled" p={0} onPress={router.back}>
          <ArrowLeft />
        </Button>
      </Box>
      <Heading size={3} color="dark.50">
        {title}
      </Heading>
      <Box w={8}>{rightItem}</Box>
    </HStack>
  );
};

export default Header;
