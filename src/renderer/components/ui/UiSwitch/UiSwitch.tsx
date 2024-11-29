import { Flex, FlexProps, Switch } from "@mantine/core";

interface UiSwitchProps {
  label?: string;
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

export const UiSwitch = ({ label, checked, onChange }: UiSwitchProps) => {
  const noLabelProps: FlexProps = label === undefined ? { justify: "flex-end" } : {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.currentTarget.checked);

  return (
    <Flex {...noLabelProps}>
      <Switch label={label} checked={checked} onChange={handleChange} />
    </Flex>
  );
};
