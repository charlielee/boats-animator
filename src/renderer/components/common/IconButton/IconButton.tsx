import classNames from "classnames";
import Button, { ButtonProps } from "../Button/Button";
import { ButtonColor } from "../Button/ButtonColor";
import "./IconButton.css";

const IconButton = (props: ButtonProps): JSX.Element => {
  return (
    <Button
      {...props}
      color={props.color || ButtonColor.TRANSPARENT}
      className={classNames(props.className, "icon-button")}
    />
  );
};

export default IconButton;
