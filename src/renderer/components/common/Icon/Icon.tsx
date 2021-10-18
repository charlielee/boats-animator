import {
  IoDocumentOutline,
  IoFolderOutline,
  IoGlobeOutline,
  IoLogoDiscord,
  IoNewspaperOutline,
  IoShareOutline,
} from "react-icons/io5";
import IconName from "./IconName";

interface IconProps {
  name: IconName;
  size?: string;
}

const Icon = ({ name, size = "1em" }: IconProps) => {
  const commonProps = {
    size,
  };

  switch (name) {
    case IconName.CONNECT:
      return <IoShareOutline {...commonProps} />;
    case IconName.DISCORD:
      return <IoLogoDiscord {...commonProps} />;
    case IconName.FILE:
      return <IoDocumentOutline {...commonProps} />;
    case IconName.FOLDER:
      return <IoFolderOutline {...commonProps} />;
    case IconName.NEWS:
      return <IoNewspaperOutline {...commonProps} />;
    case IconName.WEBSITE:
      return <IoGlobeOutline {...commonProps} />;
  }
};

export default Icon;
