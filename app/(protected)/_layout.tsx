import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { Redirect, Tabs, useRouter } from "expo-router";
import { Box, Button, HStack, Pressable, VStack, useTheme } from "native-base";
import TabBar from "../../assets/images/Subtract.svg";
import IconHome from "../../components/icons/IconHome";
import IconTransaction from "../../components/icons/IconTransaction";
import IconPlus from "../../components/icons/IconPlus";
import IconPieChart from "../../components/icons/IconPieChart";
import IconUser from "../../components/icons/IconUser";
import IconExpense from "../../components/icons/IconExpense";
import IconIncome from "../../components/icons/IconIncome";
import AddTransactionButton from "../../components/AddTransactionButton";

const ProtectedRouteLayout = () => {
  const theme = useTheme();
  const user = useContext(UserContext);

  if (!user) return <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          position: "absolute",
          height: 70,
          display: "flex",
          justifyContent: "flex-start",
        },
        tabBarLabelStyle: {
          top: -12,
          fontSize: 10,
          fontWeight: "500",
        },
        tabBarButton: ({ children, onPress }) => {
          if (route.name === "add") return <AddTransactionButton />;

          return (
            <Pressable w="1/5" onPress={onPress}>
              <VStack height="full">{children}</VStack>
            </Pressable>
          );
        },
        tabBarActiveTintColor: theme.colors.primary[100],
        tabBarInactiveTintColor: "#C6C6C6",
        tabBarBackground: () => (
          <HStack flexGrow={1}>
            <Box bg="light.100" roundedTopLeft={12} w="1/3" />
            <Box w="1/3">
              <Box w="full" position="absolute" alignItems="center">
                <TabBar />
              </Box>
            </Box>
            <Box bg="light.100" roundedTopRight={12} w="1/3" />
          </HStack>
        ),
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconHome color={color} />,
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          tabBarIcon: ({ color }) => <IconTransaction color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => <IconTransaction color={color} />,
        }}
      />

      <Tabs.Screen
        name="add-transaction"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budget",
          tabBarIcon: ({ color }) => <IconPieChart color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <IconUser color={color} />,
        }}
      />
    </Tabs>
  );
};

export default ProtectedRouteLayout;
