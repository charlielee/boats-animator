import { ReactNode } from "react";

interface InputWithValidationsProps {
  children: ReactNode;
}

const InputWithValidations = ({
  children,
}: InputWithValidationsProps): JSX.Element => {
  return <>{children}</>;
};

export default InputWithValidations;
