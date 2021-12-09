import { useState } from "react";
import { TrackType } from "../../../../common/Project";
import Content from "../../common/Content/Content";
import IconName from "../../common/Icon/IconName";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";
import TabGroup from "../../common/TabGroup/TabGroup";
import AnimationToolbar from "../AnimationToolbar/AnimationToolbar";
import CaptureTab from "../CaptureTab/CaptureTab";
import ExportDirectory from "../ExportDirectory/ExportDirectory";
import Preview from "../Preview/Preview";
import StatusToolbar from "../StatusToolbar/StatusToolbar";
import Timeline from "../Timeline/Timeline";

const Animator = (): JSX.Element => {
  const [range, setRange] = useState(10);
  const [check, setCheck] = useState(false);
  const [checkSwitch, setCheckSwitch] = useState(false);
  const [numberAndRange, setNumberAndRange] = useState(2);

  return (
    <Page>
      <PageBody>
        <Content>
          <StatusToolbar />

          <Preview />

          <AnimationToolbar />

          <Timeline
            tracks={[{ id: "1", trackType: TrackType.FRAME, trackItems: [] }]}
          />
        </Content>

        <Sidebar>
          <TabGroup
            titles={["Capture", "Guides", "X-Sheet", "Media"]}
            tabs={[
              <CaptureTab />,

              <Tab>
                <SidebarBlock title="Guides" titleIcon={IconName.GUIDES}>
                  Guides
                </SidebarBlock>
              </Tab>,

              <Tab>
                <SidebarBlock title="X-Sheet" titleIcon={IconName.GUIDES}>
                  X-Sheet
                </SidebarBlock>
              </Tab>,

              <Tab>
                <SidebarBlock title="Export" titleIcon={IconName.EXPORT}>
                  <ExportDirectory />
                </SidebarBlock>
              </Tab>,
            ]}
          />
        </Sidebar>
      </PageBody>
    </Page>
  );
};

export default Animator;
