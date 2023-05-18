import { createElement } from "react";
import IconArrowDown2 from "../../components/icons/IconArrowDown2";
import { InterfaceSelectProps } from "native-base/lib/typescript/components/primitives/Select/types";

const baseProps = (props: InterfaceSelectProps & { theme: any }) => {
  const { primary } = props.theme.colors;

  return {
    dropdownIcon: createElement(IconArrowDown2, {
      style: { marginRight: 8, color: primary[100] } as any,
    }),
  };
};

export const Select = {
  baseStyle: baseProps,
};
