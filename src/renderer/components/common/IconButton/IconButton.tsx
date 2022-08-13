import classNames from "classnames";
import Button, { ButtonProps } from "../Button/Button";
import { ButtonColor } from "../Button/ButtonColor";
import "./IconButton.css";

const IconButton = (props: ButtonProps): JSX.Element => {
  return (
    <Button
      {...props}
      noBorder={props.noBorder === undefined ? true : props.noBorder}
      color={props.color ?? ButtonColor.TRANSPARENT}
      className={classNames("icon-button", props.className)}
      iconContainerClassName={classNames(
        "icon-button__icon-container",
        props.iconContainerClassName
      )}
    />
  );
};

export default IconButton;
