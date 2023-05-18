import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import MonthSelector from "../../components/MonthSelector";
import { numberToIDR } from "../../utils/currencyFormatter";
import { useDatabase } from "../../hooks/useDatabase";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import IconArrowDown2 from "../../components/icons/IconArrowDown2";
import TabStatusBar from "../../components/utils/TabStatusBar";
import IconIncome from "../../components/icons/IconIncome";
import IconExpense from "../../components/icons/IconExpense";
import { useIsFocused } from "@react-navigation/native";
import { Transactions } from "../../types/database";

const HomePage = () => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const [date, setDate] = useState(dayjs("2023-02"));
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<
    Omit<Transactions, "user_id">[]
  >([]);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const { getBalance, getTransactions } = useDatabase();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const [balanceRes, transactionsRes] = await Promise.all([
          getBalance(),
          getTransactions(),
        ]);

        if (balanceRes.balance !== undefined) setBalance(balanceRes.balance);
        if (transactionsRes.transactions) {
          setTransactions(transactionsRes.transactions);

          let income = 0;
          let expense = 0;

          transactionsRes.transactions.forEach(({ amount }) => {
            if (amount > 0) {
              income += amount;
            } else {
              expense += amount;
            }
          });

          setIncomes(income);
          setExpenses(expense);
        }
      })();
    }
  }, [isFocused]);

  return (
    <>
      <TabStatusBar barStyle="dark-content" />
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
                  <IconIncome
                    color={theme.colors.green[100]}
                    viewBox="-2 -2 36 36"
                  />
                </Center>
                <Text color="light.80" fontWeight="medium">
                  Income
                </Text>
              </HStack>
              <Text fontSize="lg" color="light.80" fontWeight="semibold">
                {numberToIDR(incomes, "short")}
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
                  <IconExpense
                    color={theme.colors.red[100]}
                    viewBox="-2 -2 36 36"
                  />
                </Center>
                <Text color="light.80" fontWeight="medium">
                  Expense
                </Text>
              </HStack>
              <Text fontSize="lg" color="light.80" fontWeight="semibold">
                {numberToIDR(expenses, "short")}
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
