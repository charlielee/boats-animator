import { useState } from "react";
import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { RootState } from "../../../redux/store";
import Button from "../../common/Button/Button";
import { ButtonColor } from "../../common/Button/ButtonColor";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputSelect from "../../common/Input/InputSelect/InputSelect";
import InputText from "../../common/Input/InputText/InputText";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import ModalFooter from "../../common/ModalFooter/ModalFooter";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";

const fFmpegQualityPresets = {
  High: "veryslow",
  Medium: "medium",
  Low: "veryfast",
};

const ExportVideoModal = (): JSX.Element => {
  const { take } = useSelector((state: RootState) => state.project);
  const [exportLocation, setExportLocation] = useState(
    `${take?.directoryPath}.mp4`
  );
  const [qualityPreset, setQualityPreset] = useState(
    fFmpegQualityPresets.Medium
  );

  return (
    <Modal onClose={PageRoute.ANIMATOR}>
      <ModalBody>
        <Page>
          <PageBody>
            <Content>
              <ContentBlock title="Export Video">
                <InputGroup>
                  <InputLabel inputId="exportVideoLocation">
                    Export Location
                  </InputLabel>

                  <InputGroup row noGap noMargin>
                    <InputText
                      id="exportVideoLocation"
                      onChange={setExportLocation}
                      value={exportLocation}
                    />

                    <Button
                      title="Browse..."
                      onClick={() => console.log("todo")}
                      borderRadius="right"
                    />
                  </InputGroup>
                </InputGroup>

                <InputGroup>
                  <InputLabel inputId="exportVideoQualityPreset">
                    Quality Preset
                  </InputLabel>
                  <InputSelect
                    id="exportVideoQualityPreset"
                    options={fFmpegQualityPresets}
                    onChange={setQualityPreset}
                    value={qualityPreset}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLabel inputId="exportVideoFFmpegArguments">
                    FFmpeg Arguments (advanced)
                  </InputLabel>
                  <InputText
                    id="exportVideoFFmpegArguments"
                    onChange={(n) => console.log(n)}
                    value={""}
                  />
                </InputGroup>
              </ContentBlock>
            </Content>
          </PageBody>
        </Page>
      </ModalBody>

      <ModalFooter>
        <Toolbar borderTop>
          <ToolbarItem align={ToolbarItemAlign.LEFT}>
            <Button
              title="Start Export"
              color={ButtonColor.PRIMARY}
              icon={IconName.VIDEO}
              onClick={() => console.log("todo")}
            />
          </ToolbarItem>
        </Toolbar>
      </ModalFooter>
    </Modal>
  );
};

export default ExportVideoModal;
