import classNames from "classnames";
import { useHistory } from "react-router";
import { PageRoute } from "../../../../common/PageRoute";
import Icon from "../Icon/Icon";
import IconName from "../Icon/IconName";
import "./Button.css";
import { ButtonColor } from "./ButtonColor";

export interface ButtonProps {
  title: string;
  id?: string;
  active?: boolean;
  noBorder?: boolean;
  className?: string;
  iconContainerClassName?: string;
  color?: ButtonColor;
  icon?: IconName;
  label?: string;
  borderRadius?: "left" | "right" | "all";
  onClick: Function | PageRoute;
}

const Button = ({
  title,
  id,
  active = false,
  noBorder = false,
  className,
  iconContainerClassName,
  color,
  icon,
  label = title,
  borderRadius = "all",
  onClick,
}: ButtonProps): JSX.Element => {
  const history = useHistory();

  const handleClick = () => {
    typeof onClick === "string" ? history.push(onClick) : onClick();
  };

  return (
    <button
      id={id}
      className={classNames("button", className, {
        "button--color-primary": color === ButtonColor.PRIMARY,
        "button--color-transparent": color === ButtonColor.TRANSPARENT,
        "button--no-border": noBorder,
        "button--border-radius-left": borderRadius === "left",
        "button--border-radius-right": borderRadius === "right",
        "button--border-radius-all": borderRadius === "all",
      })}
      title={title}
      onClick={handleClick}
    >
      {icon !== undefined && (
        <div
          className={classNames(
            "button__icon-container",
            iconContainerClassName
          )}
        >
          <Icon name={icon} active={active} />
        </div>
      )}

      {label !== undefined && <div className="button__label">{label}</div>}
    </button>
  );
};

export default Button;
