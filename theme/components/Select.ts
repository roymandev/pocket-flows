import { createElement } from "react";
import ArrowDown from "../../assets/icons/arrow-down-2.svg";

const baseProps = () => {
  return {
    dropdownIcon: createElement(ArrowDown, {
      style: { marginRight: 8 },
    }),
  };
};

export const Select = {
  baseStyle: baseProps,
};
