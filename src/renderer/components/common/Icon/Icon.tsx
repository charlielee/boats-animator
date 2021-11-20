import classNames from "classnames";
import { IconBaseProps } from "react-icons";
import {
  IoAddCircleOutline,
  IoCamera,
  IoCaretUpCircleOutline,
  IoCodeWorkingOutline,
  IoDownload,
  IoEllipse,
  IoFileTrayStackedOutline,
  IoFolderOutline,
  IoGlobeOutline,
  IoGrid,
  IoImages,
  IoLogoDiscord,
  IoNewspaperOutline,
  IoPauseOutline,
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoPlayOutline,
  IoPlaySkipBackOutline,
  IoPlaySkipForwardOutline,
  IoRefreshOutline,
  IoShareOutline,
  IoStopOutline,
  IoSyncOutline,
  IoTimer,
  IoToggle,
} from "react-icons/io5";
import "./Icon.css";
import IconName from "./IconName";

interface IconProps {
  name: IconName;
  active?: boolean;
  className?: string;
  size?: string;
}

const getIconByName = (
  name: IconName,
  active: boolean,
  props: IconBaseProps
) => {
  // See possible icons at https://react-icons.github.io/react-icons/icons?name=io5
  switch (name) {
    case IconName.ADD:
      return <IoAddCircleOutline {...props} />;
    case IconName.CAPTURE:
      return <IoCamera {...props} />;
    case IconName.CAPTURE_AUTO:
      return <IoTimer {...props} />;
    case IconName.CIRCLE:
      return <IoEllipse {...props} />;
    case IconName.CIRCLE_UP:
      return <IoCaretUpCircleOutline {...props} />;
    case IconName.CONNECT:
      return <IoShareOutline {...props} />;
    case IconName.DISCORD:
      return <IoLogoDiscord {...props} />;
    case IconName.EXPORT:
      return <IoDownload {...props} />;
    case IconName.FRAMES:
      return <IoImages {...props} />;
    case IconName.FOLDER:
      return <IoFolderOutline {...props} />;
    case IconName.GUIDES:
      return <IoGrid {...props} />;
    case IconName.NEWS:
      return <IoNewspaperOutline {...props} />;
    case IconName.PLAY_FIRST:
      return <IoPlaySkipBackOutline {...props} />;
    case IconName.PLAY_PREVIOUS:
      return <IoPlayBackOutline {...props} />;
    case IconName.PLAY:
      return <IoPlayOutline {...props} />;
    case IconName.PLAY_PAUSE:
      return <IoPauseOutline {...props} />;
    case IconName.PLAY_STOP:
      return <IoStopOutline {...props} />;
    case IconName.PLAY_NEXT:
      return <IoPlayForwardOutline {...props} />;
    case IconName.PLAY_LAST:
      return <IoPlaySkipForwardOutline {...props} />;
    case IconName.PLAY_LOOP:
      return <IoSyncOutline {...props} />;
    case IconName.PLAY_SHORT:
      return <IoCodeWorkingOutline {...props} />;
    case IconName.PROJECTS:
      return <IoFileTrayStackedOutline {...props} />;
    case IconName.TOGGLE:
      return (
        <IoToggle
          {...props}
          className={classNames(props.className, { "icon--mirrored": !active })}
        />
      );
    case IconName.UNDO:
      return (
        <IoRefreshOutline
          {...props}
          className={classNames(props.className, "icon--mirror-and-rotate-90")}
        />
      );
    case IconName.WEBSITE:
      return <IoGlobeOutline {...props} />;
    // default:
    //   Error("No icon has been defined for this IconName in `Icon.tsx`!");
  }
};

const Icon = ({ name, active = false, className, size = "1em" }: IconProps) => {
  return getIconByName(name, active, {
    className: classNames("icon", className, { "icon--active": active }),
    size,
  });
};

export default Icon;
