import { Box, FlatList, Heading, Input } from "native-base";
import { ComponentPropsWithoutRef, useMemo, useState } from "react";
import { Platform } from "react-native";

type PinInputProps = {
  length: number;
  autoFocus: boolean;
} & ComponentPropsWithoutRef<typeof Box>;

const PinInput = ({ length, autoFocus, ...rest }: PinInputProps) => {
  const list = useMemo(() => Array(length).fill(null), [length]);
  const [code, setCode] = useState("");

  const setCodeHanlder = (value: string) => {
    setCode(value.replace(/\D/g, "").slice(0, length));
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
        rounded={0}
        h={10}
        p={0}
        position="absolute"
        zIndex={10}
        w="full"
        value={code}
        onChangeText={setCodeHanlder}
        keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
        opacity={0}
        autoFocus={autoFocus}
        onKeyPress={(e) => (e.target as any)?.setSelectionRange?.(9, 9)}
        selection={{ start: length }}
      />

      <FlatList
        horizontal
        data={list}
        keyExtractor={(_, index) => `${index}`}
        extraData={code}
        _contentContainerStyle={{
          alignItems: "center",
          //   h: 10,
        }}
        renderItem={({ item, index }) =>
          code[index] ? (
            <Heading size={1} w={8} h={10} textAlign="center">
              {code[index]}
            </Heading>
          ) : (
            <Box w={4} h={4} bg="#E0E2E9" rounded={10} mx={2} />
          )
        }
        position="absolute"
      />
    </Box>
  );
};

export default PinInput;
