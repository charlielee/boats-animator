import { useDispatch } from "react-redux";
import { takePhoto } from "../../../redux/capture/actions";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";
import "./CaptureButtonToolbar.css";

const CaptureButtonToolbar = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <Toolbar className="capture-button-toolbar">
      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <IconButton
          title="Capture Frame"
          icon={IconName.CAPTURE}
          className="animation-toolbar__capture-button"
          onClick={() => dispatch(takePhoto())}
        />
      </ToolbarItem>
    </Toolbar>
  );
};

export default CaptureButtonToolbar;
