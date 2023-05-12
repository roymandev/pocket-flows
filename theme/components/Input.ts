const baseStyle = {
  placeholderTextColor: "light.20",
  borderRadius: 16,
  height: "56px",
  padding: "16px 12px",
  borderColor: "light.60",
  fontWeight: 500,
  _hover: {
    borderColor: "primary.100",
  },
  _focus: {
    borderColor: "primary.100",
    _hover: { borderColor: "primary.100" },
    _stack: {
      style: {
        outlineWidth: "0",
        boxShadow: `0`,
      },
    },
  },
};

const defaultProps = {
  fontSize: 16,
  spellCheck: false,
};

const variantOutline = {
  borderWidth: "1",
  _focus: {
    bg: "transparent",
  },
};

export const Input = {
  baseStyle,
  defaultProps,
  variants: {
    outline: variantOutline,
  },
};
