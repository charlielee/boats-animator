import { Flex, FlexProps, Switch, SwitchProps } from "@mantine/core";

interface UiSwitchProps {
  label?: string;
  checked: boolean;
  inList?: boolean;
  onChange: (newValue: boolean) => void;
}

export const UiSwitch = ({ label, checked, inList = false, onChange }: UiSwitchProps) => {
  const inListFlexProps: FlexProps = inList ? { justify: "flex-end" } : {};
  const inListProps: SwitchProps = inList ? { size: "xs" } : {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.currentTarget.checked);

  return (
    <Flex {...inListFlexProps}>
      <Switch label={label} checked={checked} onChange={handleChange} {...inListProps} />
    </Flex>
  );
};
