import { extendTheme } from "native-base";
import { Button, Checkbox, Heading, Input, Link, Select } from "./components";

const COLORS_VIOLET = {
  100: "#7F3DFF",
  80: "#8F57FF",
  60: "#B18AFF",
  40: "#D3BDFF",
  20: "#EEE5FF",
};

export const customTheme = extendTheme({
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
    primary: COLORS_VIOLET,
    violet: COLORS_VIOLET,
    light: {
      100: "#FFFFFF",
      80: "#FCFCFC",
      60: "#F1F1FA",
      40: "#E3E5E5",
      20: "#91919F",
    },
    dark: {
      100: "#0D0E0F",
      75: "#161719",
      50: "#212325",
      25: "#292B2D",
    },
    green: {
      100: "#00A86B",
      80: "#2AB784",
      60: "#65D1AA",
      40: "#93EACA",
      20: "#CFFAEA",
    },
    red: {
      100: "#FD3C4A",
      80: "#FD5662",
      60: "#FD6F7A",
      40: "#FDA2A9",
      20: "#FDD5D7",
    },
  },

  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Inter",
  },

  components: {
    Button,
    Heading,
    Input,
    Checkbox,
    Link,
    Select,
  },
});

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof customTheme;

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
