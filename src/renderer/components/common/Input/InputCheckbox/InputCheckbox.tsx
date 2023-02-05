import classNames from "classnames";
import "./InputCheckbox.css";

interface InputCheckboxProps {
  id?: string;
  checked: boolean;
  className?: string;
  onChange(newValue: boolean): void;
}

const InputCheckbox = ({ id, checked, className, onChange }: InputCheckboxProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.checked);

  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      className={classNames("input-checkbox", className)}
      onChange={handleChange}
    />
  );
};

export default InputCheckbox;
