/* eslint-disable @typescript-eslint/no-unused-vars */
import { PageRoute } from "../../../../common/PageRoute";
import { Take } from "../../../../common/project/Take";
import { getTrackLength } from "../../../services/project/projectCalculator";
import Button from "../../common/Button/Button";
import IconName from "../../common/Icon/IconName";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";
import ExportDirectory from "../ExportDirectory/ExportDirectory";

interface MediaTabProps {
  take: Take;
}

const MediaTab = ({ take }: MediaTabProps): JSX.Element => {
  return (
    <Tab>
      <SidebarBlock title="Media" titleIcon={IconName.DOCUMENT}>
        <ExportDirectory />

        <InputGroup>
          <InputLabel inputId="exportVideoButton">Render current take as a video file:</InputLabel>
        </InputGroup>
      </SidebarBlock>
    </Tab>
  );
};

export default MediaTab;
