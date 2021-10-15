import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";
import { ButtonStyle } from "./ButtonStyle";

interface ButtonProps {
  title: string;
  icon?: IconProp;
  label?: string;
  style?: ButtonStyle;
}

const Button = ({
  title,
  icon,
  label = title,
  style = ButtonStyle.DEFAULT,
}: ButtonProps): JSX.Element => {
  return (
    <button className="button" title={title}>
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
