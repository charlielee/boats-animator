import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { getTrackLength } from "../../../../common/Project";
import { RootState } from "../../../redux/store";
import Button from "../../common/Button/Button";
import IconName from "../../common/Icon/IconName";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";
import ExportDirectory from "../ExportDirectory/ExportDirectory";

const MediaTab = (): JSX.Element => {
  const { take } = useSelector((state: RootState) => state.project);

  if (!take) {
    return <></>;
  }

  return (
    <Tab>
      <SidebarBlock title="Media" titleIcon={IconName.DOCUMENT}>
        <ExportDirectory />

        <InputGroup>
          <InputLabel inputId="exportVideoButton">
            Render current take as a video file:
          </InputLabel>
          <Button
            id="exportVideoButton"
            title="Export Video..."
            onClick={PageRoute.EXPORT_VIDEO_MODAL}
            icon={IconName.VIDEO}
            disabled={getTrackLength(take.frameTrack) === 0}
          />
        </InputGroup>
      </SidebarBlock>
    </Tab>
  );
};

export default MediaTab;
