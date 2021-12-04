import InputGroup from "../InputGroup/InputGroup";
import InputNumber from "../InputNumber/InputNumber";
import InputRange from "../InputRange/InputRange";

interface InputNumberAndRangeProps {
  id?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange(newValue: number): void;
}

const InputNumberAndRange = ({
  id,
  min,
  max,
  step,
  value,
  onChange,
}: InputNumberAndRangeProps): JSX.Element => {
  return (
    <InputGroup row>
      <InputNumber
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      <InputRange
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  );
};

export default InputNumberAndRange;
