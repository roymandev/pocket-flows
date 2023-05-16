import { Box, FlatList, Heading, Input } from "native-base";
import { ComponentPropsWithoutRef, useMemo, useState } from "react";
import { Platform } from "react-native";

type PinInputProps = {
  length: number;
  autoFocus: boolean;
  hide?: boolean;
  value: string;
  onChange: (value: string) => void;
} & ComponentPropsWithoutRef<typeof Box>;

const PinInput = ({
  length,
  autoFocus,
  hide,
  value,
  onChange,
  ...rest
}: PinInputProps) => {
  const list = useMemo(() => Array(length).fill(null), [length]);

  const setCodeHanlder = (value: string) => {
    onChange(value.replace(/\D/g, ""));
  };

  return (
    <Box
      {...rest}
      h={10}
      display="flex"
      alignItems="center"
      flexDirection="row"
    >
      <Input
        variant="unstyled"
        type={hide ? "password" : "text"}
        rounded={0}
        h={10}
        p={0}
        position="absolute"
        zIndex={10}
        w="full"
        value={value}
        onChangeText={setCodeHanlder}
        keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
        opacity={0}
        autoFocus={autoFocus}
        onKeyPress={(e) => (e.target as any)?.setSelectionRange?.(9, 9)}
        selection={{ start: length }}
        maxLength={length}
      />

      <FlatList
        horizontal
        data={list}
        keyExtractor={(_, index) => `${index}`}
        extraData={value}
        _contentContainerStyle={{
          alignItems: "center",
          //   h: 10,
        }}
        renderItem={({ item, index }) => {
          if (!hide && value[index])
            return (
              <Heading size={1} w={8} h={10} textAlign="center">
                {value[index]}
              </Heading>
            );

          return (
            <Box
              w={4}
              h={4}
              bg={value[index] ? "primary.100" : "#E0E2E9"}
              rounded={10}
              mx={2}
            />
          );
        }}
        position="absolute"
      />
    </Box>
  );
};

export default PinInput;
