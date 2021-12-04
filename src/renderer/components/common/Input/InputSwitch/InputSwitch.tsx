import Icon from "../../Icon/Icon";
import IconName from "../../Icon/IconName";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import "./InputSwitch.css";

interface InputSwitchProps {
  id: string;
  checked: boolean;
  className?: string;
  onChange(newValue: boolean): void;
}

const InputSwitch = ({
  id,
  checked,
  onChange,
}: InputSwitchProps): JSX.Element => {
  return (
    <label htmlFor={id} className="input-switch" role="switch">
      <Icon
        name={IconName.TOGGLE}
        active={checked}
        className="input-switch__icon"
      />
      <InputCheckbox
        id={id}
        className="input-switch__checkbox"
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};
export default InputSwitch;
