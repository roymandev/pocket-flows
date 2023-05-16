import dayjs, { Dayjs } from "dayjs";
import { Button, HStack, Input, Select } from "native-base";
import { KeyboardAvoidingView, Modal } from "native-base";
import { ComponentPropsWithoutRef, useState } from "react";

type MonthSelectorType = {
  value: Dayjs;
  onSelect: (date: Dayjs) => void;
} & ComponentPropsWithoutRef<typeof Modal>;

const MonthSelector = ({ value, onSelect, ...rest }: MonthSelectorType) => {
  const [year, setYear] = useState(value.format("YYYY"));
  const [month, setMonth] = useState(value.format("M"));

  const setYearHandler = (value: string) => {
    setYear(value.replace(/[^0-9]/g, ""));
  };

  const onSelectHandler = () => {
    if (year.length < 4 || !month) return;

    onSelect(dayjs(`${year}-${month}`));
    rest.onClose();
  };

  return (
    <Modal size="full" justifyContent="flex-end" {...rest}>
      <KeyboardAvoidingView w="full" behavior="position">
        <Modal.Content roundedBottom={0} roundedTop={24} px={4} pt={8} pb={6}>
          <HStack space={2}>
            <Input
              placeholder="Year"
              flexGrow={1}
              keyboardType="number-pad"
              maxLength={4}
              value={year}
              onChangeText={setYearHandler}
            />
            <Select
              placeholder="Month"
              flexGrow={1}
              selectedValue={month}
              onValueChange={setMonth}
            >
              {[...Array(12)].map((_, i) => (
                <Select.Item
                  key={i}
                  label={dayjs().month(i).format("MMMM")}
                  value={`${i + 1}`}
                />
              ))}
            </Select>
          </HStack>
          <Button
            mt={10}
            isDisabled={year.length < 4 || !month}
            onPress={onSelectHandler}
          >
            Select
          </Button>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default MonthSelector;
