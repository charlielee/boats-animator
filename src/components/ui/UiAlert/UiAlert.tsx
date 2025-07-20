import { Alert } from "@mantine/core";
import { ReactNode } from "react";
import { SemanticColor } from "../Theme/SemanticColor";
import Icon from "../../common/Icon/Icon";
import IconName from "../../common/Icon/IconName";

interface UiAlertProps {
  title: ReactNode;
  semanticColor?: SemanticColor;
  children: ReactNode;
}

export const UiAlert = ({ title, semanticColor, children }: UiAlertProps) => {
  return (
    children !== undefined && (
      <Alert
        title={title}
        color={semanticColor}
        icon={<Icon name={IconName.ERROR} />}
        variant="light"
      >
        {children}
      </Alert>
    )
  );
};
