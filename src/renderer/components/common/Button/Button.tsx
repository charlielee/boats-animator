import classNames from "classnames";
import { useNavigate } from "react-router-dom";
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
  onClick: (() => void) | PageRoute;
  disabled?: boolean;
  testId?: string;
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
  disabled = false,
  testId,
}: ButtonProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => (typeof onClick === "string" ? navigate(onClick) : onClick());

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
        "button--disabled": disabled,
      })}
      title={title}
      onClick={() => (disabled ? undefined : handleClick())}
      disabled={disabled}
      aria-disabled={disabled ? "true" : "false"}
      data-testid={testId}
    >
      {icon !== undefined && (
        <div className={classNames("button__icon-container", iconContainerClassName)}>
          <Icon name={icon} active={active} />
        </div>
      )}

      {label !== undefined && <div className="button__label">{label}</div>}
    </button>
  );
};

export default Button;
