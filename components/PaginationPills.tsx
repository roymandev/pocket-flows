import { Button, Center, FlatList, HStack } from "native-base";
import { ComponentPropsWithoutRef, useEffect, useMemo } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type PaginationPillsProps = {
  length: number;
  currentPage?: number;
  onPillPressed: (index: number) => void;
} & ComponentPropsWithoutRef<typeof HStack>;

const PaginationPills = ({
  length,
  currentPage = 0,
  onPillPressed,
  ...rest
}: PaginationPillsProps) => {
  const list = useMemo(() => Array(length).fill(null), [length]);

  return (
    <Center {...rest}>
      <FlatList
        horizontal
        data={list}
        keyExtractor={(_, index) => `${index}`}
        extraData={currentPage}
        renderItem={({ item, index }) => (
          <Pill
            isActive={currentPage === index}
            onPress={() => onPillPressed(index)}
          />
        )}
      />
    </Center>
  );
};

type PillProps = {
  isActive: boolean;
} & ComponentPropsWithoutRef<typeof Button>;

const Pill = ({ isActive, ...rest }: PillProps) => {
  const size = useSharedValue(8);
  const bg = useSharedValue("#EEE5FF");

  const config = {
    duration: 200,
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(size.value, config),
      height: withTiming(size.value, config),
      backgroundColor: withTiming(bg.value, config),
    };
  });

  useEffect(() => {
    size.value = isActive ? 16 : 8;
    bg.value = isActive ? "#7F3DFF" : "#EEE5FF";
  }, [isActive]);

  return (
    <Button p={0} mx={2} variant="unstyled" {...rest}>
      <Center h={4} w={4}>
        <Animated.View
          style={[
            {
              borderRadius: 999,
            },
            style,
          ]}
        />
      </Center>
    </Button>
  );
};

export default PaginationPills;
