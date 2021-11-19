import classNames from "classnames";
import { PageRoute } from "../../../../common/PageRoute";
import Button from "../Button/Button";
import { ButtonColor } from "../Button/ButtonColor";
import IconName from "../Icon/IconName";
import "./IconButton.css";

interface IconButtonProps {
  title: string;
  className?: string;
  color?: ButtonColor;
  icon?: IconName;
  onClick: Function | PageRoute;
}

const IconButton = (props: IconButtonProps): JSX.Element => {
  return (
    <Button
      {...props}
      color={props.color || ButtonColor.TRANSPARENT}
      className={classNames(props.className, "icon-button")}
    />
  );
};

export default IconButton;
