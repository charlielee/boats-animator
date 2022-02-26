import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { Take } from "../../../../common/Project";
import { zeroPad } from "../../../../common/utils";
import { RootState } from "../../../redux/store";
import Button from "../../common/Button/Button";
import { ButtonColor } from "../../common/Button/ButtonColor";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";

const StatusToolbar = (): JSX.Element => {
  const [take] = useSelector((state: RootState) => [state.project.take]);

  const makeTakeTitle = (take: Take) =>
    `Shot ${zeroPad(take.shotNumber, 3)} Take ${zeroPad(take.takeNumber, 2)}`;

  return (
    <Toolbar borderBottom>
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <Button
          title={take ? makeTakeTitle(take) : "No take"}
          onClick={PageRoute.STARTUP_MODAL}
          color={ButtonColor.TRANSPARENT}
        />
      </ToolbarItem>
      <ToolbarItem align={ToolbarItemAlign.CENTER}>Frame 1 of 0</ToolbarItem>
      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        15 FPS
      </ToolbarItem>
    </Toolbar>
  );
};

export default StatusToolbar;
