import { createElement } from "react";
import IconArrowDown2 from "../../components/icons/IconArrowDown2";

const baseProps = () => {
  return {
    dropdownIcon: createElement(IconArrowDown2, {
      style: { marginRight: 8, color: "#91919F" } as any,
    }),
  };
};

export const Select = {
  baseStyle: baseProps,
};
