import { useRouter } from "expo-router";
import { Box, Button, useTheme } from "native-base";
import IconIncome from "./icons/IconIncome";
import IconExpense from "./icons/IconExpense";
import IconPlus from "./icons/IconPlus";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AddTransactionButton = () => {
  const router = useRouter();
  const theme = useTheme();
  const rotateDeg = useSharedValue(0);
  const bottomPos = useSharedValue(23);
  const xPos = useSharedValue(0);

  const openButtonAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateDeg.value}deg` }],
  }));
  const incomeButtonAnimatedStyles = useAnimatedStyle(() => ({
    bottom: bottomPos.value,
    left: xPos.value,
    display: rotateDeg.value === 0 ? "none" : "flex",
  }));
  const expenseButtonAnimatedStyles = useAnimatedStyle(() => ({
    bottom: bottomPos.value,
    right: xPos.value,
    display: rotateDeg.value === 0 ? "none" : "flex",
  }));

  const toggleOpen = () => {
    rotateDeg.value = withTiming(rotateDeg.value === 0 ? 135 : 0, {
      duration: 200,
    });
    bottomPos.value = withTiming(rotateDeg.value === 0 ? 90 : 23, {
      duration: 200,
    });
    xPos.value = withTiming(rotateDeg.value === 0 ? -60 : 7, {
      duration: 200,
    });
  };

  return (
    <Box w="1/5" alignItems="center">
      <Animated.View
        style={[
          {
            position: "absolute",
          },
          incomeButtonAnimatedStyles,
        ]}
      >
        <Button
          mx="auto"
          colorScheme="green"
          w={57}
          h={57}
          rounded="full"
          p={0}
          onPress={() => {
            toggleOpen();
            router.push({
              pathname: "/add-transaction",
              params: {
                type: "expense",
              },
            });
          }}
        >
          <IconIncome color={theme.colors.light[100]} />
        </Button>
      </Animated.View>

      <Animated.View
        style={[{ position: "absolute" }, expenseButtonAnimatedStyles]}
      >
        <Button
          mx="auto"
          colorScheme="red"
          w={57}
          h={57}
          rounded="full"
          p={0}
          onPress={() => {
            toggleOpen();
            router.push({
              pathname: "/add-transaction",
              params: {
                type: "expense",
              },
            });
          }}
        >
          <IconExpense color={theme.colors.light[100]} />
        </Button>
      </Animated.View>
      <Button
        mx="auto"
        position="absolute"
        bottom="23px"
        w={57}
        h={57}
        rounded="full"
        p={0}
        onPress={toggleOpen}
      >
        <Animated.View style={openButtonAnimatedStyles}>
          <IconPlus color={theme.colors.light[100]} />
        </Animated.View>
      </Button>
    </Box>
  );
};

export default AddTransactionButton;
