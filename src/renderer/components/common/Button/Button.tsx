import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { PageRoute } from "../../../../common/PageRoute";
import "./Button.css";
import { ButtonStyle } from "./ButtonStyle";

interface ButtonProps {
  title: string;
  icon?: IconProp;
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
          <FontAwesomeIcon
            className="button__icon"
            icon={icon}
            size={style == ButtonStyle.LARGE_ICON ? "4x" : "1x"}
          />
        </div>
      )}

      {label !== undefined && <div className="button__label">{label}</div>}
    </button>
  );
};

export default Button;
