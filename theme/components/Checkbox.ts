const baseStyle = (props: Record<string, any>) => {
  const { colorScheme, theme } = props;
  const { colors } = theme;
  return {
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: "md",
    opacity: 1,
    p: 1,
    mt: 2,

    bg: "white",
    borderColor: `${colorScheme}.100`,

    _text: {
      color: "darkText",
      ml: 2,
    },
    _icon: {
      color: "white",
    },
    _checked: {
      borderColor: `${colorScheme}.100`,
      bg: `${colorScheme}.100`,
      _hover: {
        borderColor: `${colorScheme}.100`,
        bg: `${colorScheme}.100`,
      },
      _pressed: {
        borderColor: `${colorScheme}.100`,
        bg: `${colorScheme}.100`,
      },
    },
    _hover: {
      borderColor: `${colorScheme}.100`,
    },
    _pressed: {
      borderColor: `${colorScheme}.100`,
    },

    _stack: {
      direction: "row",
      alignItems: "center",
      space: 3,
      _web: {
        cursor: props.isDisabled ? "not-allowed" : "pointer",
      },
    },

    _disabled: {
      _web: {
        cursor: "not-allowed",
      },
      opacity: 0.4,
    },
  };
};

export const Checkbox = {
  baseStyle,
};
