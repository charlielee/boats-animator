import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ReactNode } from "react";
import "./Button.css";
import { ButtonStyle } from "./ButtonStyle";

interface ButtonProps {
  title: string;
  style?: ButtonStyle;
  icon?: IconProp;
  children?: ReactNode;
}

const Button = ({
  title,
  style = ButtonStyle.STANDARD,
  icon,
  children,
}: ButtonProps): JSX.Element => {
  return (
    <button className="button" title={title}>
      {icon !== undefined && (
        <FontAwesomeIcon
          className={classNames("button__icon", {
            "button__icon--large": style === ButtonStyle.LARGE_ICON,
          })}
          icon={icon}
        />
      )}

      {children !== undefined && (
        <div className="button__children">{children}</div>
      )}
    </button>
  );
};

export default Button;
