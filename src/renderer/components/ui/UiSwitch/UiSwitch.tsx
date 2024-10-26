import { Switch } from "@mantine/core";

interface UiSwitchProps {
  label: string;
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

export const UiSwitch = ({ label, checked, onChange }: UiSwitchProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.currentTarget.checked);

  return <Switch label={label} checked={checked} onChange={handleChange} />;
};
