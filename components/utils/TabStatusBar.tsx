import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "native-base";
import { ComponentPropsWithoutRef } from "react";

const TabStatusBar = (props: ComponentPropsWithoutRef<typeof StatusBar>) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default TabStatusBar;
