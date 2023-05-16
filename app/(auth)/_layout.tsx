import { Slot } from "expo-router";
import { Box } from "native-base";

const _layout = () => {
  return (
    <Box safeArea flexGrow={1}>
      <Slot />
    </Box>
  );
};

export default _layout;
