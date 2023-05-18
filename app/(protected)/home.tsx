import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import MonthSelector from "../../components/MonthSelector";
import { numberToIDR } from "../../utils/currencyFormatter";
import { UserContext } from "../../utils/UserContext";
import { useDatabase } from "../../hooks/useDatabase";
import IncomeIcon from "../../assets/icons/income.svg";
import ExpenseIcon from "../../assets/icons/expense.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import IconHome from "../../components/icons/IconHome";
import IconArrowDown2 from "../../components/icons/IconArrowDown2";

const HomePage = () => {
  const user = useContext(UserContext);
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(dayjs("2023-02"));
  const [balance, setBalance] = useState(0);
  const { getBalance } = useDatabase();

  const fetchBalance = async () => {
    const { balance } = await getBalance();

    if (balance) setBalance(balance);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <Tabs.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FFF6E6",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleAlign: "center",
          headerTitle: () => (
            <Button
              variant="outline"
              rounded="full"
              pr={4}
              _text={{
                fontSize: 14,
                fontWeight: "medium",
              }}
              py={0}
              h={10}
              onPress={() => setModalOpen(true)}
              leftIcon={<IconArrowDown2 color={theme.colors.primary[100]} />}
            >
              {date.format(
                `MMMM ${date.year() === dayjs().year() ? "" : "YYYY"}`
              )}
            </Button>
          ),
        }}
      />
      <Box roundedBottom={32} overflow="hidden">
        <LinearGradient
          colors={["#FFF6E6", "rgba(248, 237, 216, 0)"]}
          locations={[0.9, 1]}
          style={{ height: "100%", position: "absolute", width: "100%" }}
        />
        <Box safeArea px={4} pb={4}>
          <Text textAlign="center" fontWeight="medium" color="light.20">
            Account Balance
          </Text>
          <Text mt={2} textAlign="center" fontWeight="semibold" fontSize="3xl">
            {numberToIDR(balance)}
          </Text>

          <HStack space={4} mt={7}>
            <VStack
              flexGrow={1}
              flexShrink={0}
              bg="green.100"
              p={4}
              rounded={28}
              space={2}
            >
              <HStack alignItems="center" space={2}>
                <Center bg="light.80" w={8} h={8} rounded={12}>
                  <IncomeIcon width={24} height={24} />
                </Center>
                <Text color="light.80" fontWeight="medium">
                  Income
                </Text>
              </HStack>
              <Text fontSize="lg" color="light.80" fontWeight="semibold">
                {numberToIDR(100000000, "short")}
              </Text>
            </VStack>
            <VStack
              flexGrow={1}
              flexShrink={0}
              bg="red.100"
              p={4}
              rounded={28}
              space={2}
            >
              <HStack alignItems="center" space={2}>
                <Center bg="light.80" w={8} h={8} rounded={12}>
                  <ExpenseIcon width={24} height={24} />
                </Center>
                <Text color="light.80" fontWeight="medium">
                  Expense
                </Text>
              </HStack>
              <Text fontSize="lg" color="light.80" fontWeight="semibold">
                {numberToIDR(100000, "short")}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Box>

      <MonthSelector
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        value={date}
        onSelect={setDate}
      />
    </>
  );
};

export default HomePage;
