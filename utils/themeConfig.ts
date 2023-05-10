import { extendTheme } from "native-base";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

export const themeConfig: Parameters<typeof extendTheme>[0] = {
  fontConfig: {
    Inter: {
      500: {
        normal: "Inter_500Medium",
      },
      600: {
        normal: "Inter_600SemiBold",
      },
      700: {
        normal: "Inter_700Bold",
      },
    },
  },

  colors: {
    violet: {
      100: "#7F3DFF",
      80: "#8F57FF",
      60: "#B18AFF",
      40: "#D3BDFF",
      20: "#EEE5FF",
    },
    light: {
      100: "#FFFFFF",
      80: "#FCFCFC",
      60: "#F1F1FA",
      40: "#E3E5E5",
      20: "#91919F",
    },
  },

  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Inter",
  },

  components: {
    Button: {
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
        solid: ({ colorScheme }: InterfaceButtonProps) => ({
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
        }),
        light: ({ colorScheme }: InterfaceButtonProps) => ({
          bg: `${colorScheme}.20`,
          _text: {
            color: "violet.100",
          },
          _hover: {
            bg: `${colorScheme}.40`,
          },
          _pressed: {
            bg: `${colorScheme}.40`,
          },
        }),
      },
    },
  },
};
