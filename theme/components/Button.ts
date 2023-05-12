import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

function variantSolid({ colorScheme }: InterfaceButtonProps) {
  return {
    bg: `${colorScheme}.100`,
    _text: {
      color: "light.80",
    },
    _hover: {
      bg: `${colorScheme}.80`,
    },
    _pressed: {
      bg: `${colorScheme}.80`,
    },
  };
}

function variantLight({ colorScheme }: InterfaceButtonProps) {
  return {
    bg: `${colorScheme}.20`,
    _text: {
      color: `${colorScheme}.100`,
    },
    _hover: {
      bg: `${colorScheme}.40`,
    },
    _pressed: {
      bg: `${colorScheme}.40`,
    },
  };
}

function variantOutline({ colorScheme }: InterfaceButtonProps) {
  return {
    bg: "light.100",
    borderColor: "light.60",
    _text: {
      color: "dark.50",
    },
    _hover: {
      bg: "light.80",
      borderColor: "light.40",
    },
    _pressed: {
      bg: "light.80",
      borderColor: "light.40",
    },
  };
}

export const Button = {
  defaultProps: {
    colorScheme: "violet",
  },
  baseStyle: {
    borderRadius: 16,
    _text: {
      fontWeight: 500,
    },
  },
  sizes: {
    md: {
      _text: {
        fontSize: 18,
      },
    },
  },
  variants: {
    solid: variantSolid as any,
    light: variantLight as any,
    outline: variantOutline as any,
  },
};
