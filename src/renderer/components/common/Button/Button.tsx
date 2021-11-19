import classNames from "classnames";
import { useHistory } from "react-router";
import { PageRoute } from "../../../../common/PageRoute";
import Icon from "../Icon/Icon";
import IconName from "../Icon/IconName";
import "./Button.css";
import { ButtonColor } from "./ButtonColor";

interface ButtonProps {
  title: string;
  className?: string;
  color?: ButtonColor;
  icon?: IconName;
  label?: string;
  onClick: Function | PageRoute;
}

const Button = ({
  title,
  className,
  color,
  icon,
  label = title,
  onClick,
}: ButtonProps): JSX.Element => {
  const history = useHistory();

  const handleClick = () => {
    typeof onClick === "string" ? history.push(onClick) : onClick();
  };

  return (
    <button
      className={classNames("button", className, {
        "button--color-primary": color === ButtonColor.PRIMARY,
        "button--color-transparent": color === ButtonColor.TRANSPARENT,
      })}
      title={title}
      onClick={handleClick}
    >
      {icon !== undefined && (
        <div className="button__icon-container">
          <Icon name={icon} />
        </div>
      )}

      {label !== undefined && <div className="button__label">{label}</div>}
    </button>
  );
};

export default Button;
