import { useHistory } from "react-router";
import { PageRoute } from "../../../../common/PageRoute";
import Icon from "../Icon/Icon";
import IconName from "../Icon/IconName";
import "./Button.css";
import { ButtonStyle } from "./ButtonStyle";

interface ButtonProps {
  title: string;
  icon?: IconName;
  label?: string;
  style?: ButtonStyle;
  onClick: Function | PageRoute;
}

const Button = ({
  title,
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
    <button className="button" title={title} onClick={handleClick}>
      {icon !== undefined && (
        <div className="button__icon-container">
          <Icon
            name={icon}
            size={style === ButtonStyle.LARGE_ICON ? "4em" : "1em"}
          />
        </div>
      )}

      {label !== undefined && <div className="button__label">{label}</div>}
    </button>
  );
};

export default Button;
