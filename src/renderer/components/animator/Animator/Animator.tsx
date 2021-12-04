import { useState } from "react";
import { TrackType } from "../../../../common/Project";
import Content from "../../common/Content/Content";
import IconName from "../../common/Icon/IconName";
import InputCheckbox from "../../common/Input/InputCheckbox/InputCheckbox";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputNumber from "../../common/Input/InputNumber/InputNumber";
import InputRange from "../../common/Input/InputRange/InputRange";
import InputSelect from "../../common/Input/InputSelect/InputSelect";
import InputSwitch from "../../common/Input/InputSwitch/InputSwitch";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";
import TabGroup from "../../common/TabGroup/TabGroup";
import AnimationToolbar from "../AnimationToolbar/AnimationToolbar";
import ExportDirectory from "../ExportDirectory/ExportDirectory";
import PreviewArea from "../PreviewArea/PreviewArea";
import StatusToolbar from "../StatusToolbar/StatusToolbar";
import Timeline from "../Timeline/Timeline";

const Animator = (): JSX.Element => {
  const [range, setRange] = useState(10);
  const [check, setCheck] = useState(false);
  const [checkSwitch, setCheckSwitch] = useState(false);

  return (
    <Page>
      <PageBody>
        <Content>
          <StatusToolbar />

          <PreviewArea />

          <AnimationToolbar />

          <Timeline
            tracks={[{ id: "1", trackType: TrackType.FRAME, trackItems: [] }]}
          />
        </Content>

        <Sidebar>
          <TabGroup
            titles={["Capture", "Guides", "X-Sheet", "Media"]}
            tabs={[
              <Tab>
                <SidebarBlock title="Capture" titleIcon={IconName.CAPTURE}>
                  <InputGroup>
                    <InputLabel inputId="example-select">
                      Example Select
                    </InputLabel>
                    <InputSelect
                      id="example-select"
                      options={{
                        "1": "1",
                        "2": "2",
                      }}
                      onChange={(newValue) => {
                        console.log(newValue);
                      }}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLabel inputId="example-number">
                      Example Number
                    </InputLabel>
                    <InputNumber
                      id="example-number"
                      min={1}
                      max={100}
                      onChange={(newValue) => console.log(newValue)}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLabel inputId="example-range">
                      Example Range
                    </InputLabel>
                    <InputRange
                      id="example-range"
                      onChange={setRange}
                      min={0}
                      max={100}
                      step={10}
                      value={range}
                    />
                  </InputGroup>

                  <InputGroup row>
                    <InputCheckbox
                      id="example-checkbox"
                      checked={check}
                      onChange={setCheck}
                    />
                    <InputLabel inputId="example-checkbox">
                      Example Checkbox
                    </InputLabel>
                  </InputGroup>

                  <InputGroup row>
                    <InputSwitch
                      id="example-switch"
                      checked={checkSwitch}
                      onChange={setCheckSwitch}
                    />
                    <InputLabel inputId="example-switch">
                      Example Switch
                    </InputLabel>
                  </InputGroup>
                </SidebarBlock>

                <SidebarBlock
                  title="Auto-Capture"
                  titleIcon={IconName.CAPTURE_AUTO}
                >
                  Auto-Capture
                </SidebarBlock>
              </Tab>,

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
