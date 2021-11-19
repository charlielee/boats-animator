import classNames from "classnames";
import { useHistory } from "react-router";
import { PageRoute } from "../../../../common/PageRoute";
import Icon from "../Icon/Icon";
import IconName from "../Icon/IconName";
import "./Button.css";
import { ButtonColor } from "./ButtonColor";
import { ButtonStyle } from "./ButtonStyle";

interface ButtonProps {
  title: string;
  color?: ButtonColor;
  icon?: IconName;
  label?: string;
  style?: ButtonStyle;
  onClick: Function | PageRoute;
}

const Button = ({
  title,
  color,
  icon,
  label = title,
  style = ButtonStyle.DEFAULT,
  onClick,
}: ButtonProps): JSX.Element => {
  const history = useHistory();

  const handleClick = () => {
    typeof onClick === "string" ? history.push(onClick) : onClick();
  };

  return (
    <button
      className={classNames("button", {
        "button--style-icon-only": style === ButtonStyle.ICON_ONLY,
        "button--color-primary": color === ButtonColor.PRIMARY,
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
