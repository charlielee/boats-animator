import { IconBaseProps } from "react-icons";
import {
  IoAddCircleOutline,
  IoCamera,
  IoDownload,
  IoFileTrayStackedOutline,
  IoFolderOutline,
  IoGlobeOutline,
  IoGrid,
  IoLogoDiscord,
  IoNewspaperOutline,
  IoShareOutline,
  IoTimer,
} from "react-icons/io5";
import IconName from "./IconName";

interface IconProps {
  name: IconName;
  className?: string;
  size?: string;
}

const getIconByName = (name: IconName, props: IconBaseProps) => {
  // See possible icons at https://react-icons.github.io/react-icons/icons?name=io5
  switch (name) {
    case IconName.ADD:
      return <IoAddCircleOutline {...props} />;
    case IconName.CAPTURE:
      return <IoCamera {...props} />;
    case IconName.CAPTURE_AUTO:
      return <IoTimer {...props} />;
    case IconName.CONNECT:
      return <IoShareOutline {...props} />;
    case IconName.DISCORD:
      return <IoLogoDiscord {...props} />;
    case IconName.EXPORT:
      return <IoDownload {...props} />;
    case IconName.FOLDER:
      return <IoFolderOutline {...props} />;
    case IconName.GUIDES:
      return <IoGrid {...props} />;
    case IconName.NEWS:
      return <IoNewspaperOutline {...props} />;
    case IconName.PROJECTS:
      return <IoFileTrayStackedOutline {...props} />;
    case IconName.WEBSITE:
      return <IoGlobeOutline {...props} />;
    // default:
    //   Error("No icon has been defined for this IconName in `Icon.tsx`!");
  }
};

const Icon = ({ name, className, size = "1em" }: IconProps) => {
  return getIconByName(name, {
    className,
    size,
  });
};

export default Icon;
