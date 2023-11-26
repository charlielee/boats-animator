import useProjectAndTake from "../../../hooks/useProjectAndTake";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./StatusToolbar.css";
import StatusToolbarTimestampWithContext from "./StatusToolbarTimestamp/StatusToolbarTimestamp";

const StatusToolbar = (): JSX.Element => {
  const { take } = useProjectAndTake();

  return (
    <Toolbar className="status-toolbar">
      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <StatusToolbarTimestampWithContext take={take} />
      </ToolbarItem>
    </Toolbar>
  );
};

export default StatusToolbar;
