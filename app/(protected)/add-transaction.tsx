import { Redirect, Tabs, useLocalSearchParams, useRouter } from "expo-router";
import {
  Box,
  Button,
  Input,
  ScrollView,
  Select,
  StatusBar,
  Text,
  VStack,
  useTheme,
} from "native-base";
import IconArrowLeft from "../../components/icons/IconArrowLeft";
import { numberToIDR } from "../../utils/currencyFormatter";
import { useState } from "react";
import TabStatusBar from "../../components/utils/TabStatusBar";

const AddExpensePage = () => {
  const { type } = useLocalSearchParams<{ type: "expense" | "income" }>();
  const router = useRouter();
  const theme = useTheme();
  const [amount, setAmount] = useState(0);

  if (!type) return <Redirect href="/home" />;

  return (
    <>
      <TabStatusBar barStyle="light-content" />
      <Tabs.Screen
        options={{
          title: type,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: theme.colors.light[100],
          },
          headerStyle: {
            backgroundColor:
              type === "income"
                ? theme.colors.green[100]
                : theme.colors.red[100],
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <Button variant="unstyled" onPress={() => router.back()}>
              <IconArrowLeft color={theme.colors.light[100]} />
            </Button>
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Box
        bg={type === "income" ? "green.100" : "red.100"}
        flexGrow={1}
        justifyContent="flex-end"
      >
        <Box px={6} flexShrink={0}>
          <Text color="light.80" fontSize={18} fontWeight="bold" opacity={0.7}>
            How much?
          </Text>
          <Input
            variant="unstyled"
            color="light.100"
            fontWeight="bold"
            fontSize={32}
            value={numberToIDR(amount)}
            onChangeText={(value) =>
              setAmount(parseInt(value.replace(/\D/g, "") || "0"))
            }
            px={0}
            h={20}
          />
        </Box>
        <Box
          roundedTop={32}
          overflow="hidden"
          bg={theme.colors.light[100]}
          flexShrink={1}
        >
          <ScrollView>
            <VStack space={4} py={7} px={4} overflow="hidden">
              <Select placeholder="Category" />
              <Input placeholder="Description" />

              <Button variant="outline" borderStyle="dashed">
                Add Attachment
              </Button>

              <Button mt={6}>Continue</Button>
            </VStack>
          </ScrollView>
        </Box>
      </Box>
    </>
  );
};

export default AddExpensePage;
