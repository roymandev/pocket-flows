import { Box, Button, HStack, Heading } from "native-base";
import ArrowLeft from "../assets/icons/arrow-left.svg";
import { useRouter } from "expo-router";

type HeaderProps = {
  title: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
};

const Header = ({ title, leftItem, rightItem }: HeaderProps) => {
  const router = useRouter();

  return (
    <HStack
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      h={16}
      px={4}
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
