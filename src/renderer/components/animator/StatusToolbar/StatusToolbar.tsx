import { Take } from "../../../../common/project/Take";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./StatusToolbar.css";
import StatusToolbarTimestampWithContext from "./StatusToolbarTimestamp/StatusToolbarTimestamp";

interface StatusToolbarProps {
  take: Take;
}

const StatusToolbar = ({ take }: StatusToolbarProps): JSX.Element => (
  <Toolbar className="status-toolbar">
    <ToolbarItem align={ToolbarItemAlign.CENTER}>
      <StatusToolbarTimestampWithContext take={take} />
    </ToolbarItem>
  </Toolbar>
);

export default StatusToolbar;
