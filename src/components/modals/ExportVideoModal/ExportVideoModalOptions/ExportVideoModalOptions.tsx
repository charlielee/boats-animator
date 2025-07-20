import { useEffect, useState } from "react";
import useProjectAndTake from "../../../../hooks/useProjectAndTake";
import { makeFrameFileName } from "../../../../services/project/projectBuilder";
import { getTrackLength } from "../../../../services/project/projectCalculator";
import Button from "../../../common/Button/Button";
import { ButtonColor } from "../../../common/Button/ButtonColor";
import Content from "../../../common/Content/Content";
import ContentBlock from "../../../common/ContentBlock/ContentBlock";
import IconName from "../../../common/Icon/IconName";
import InputGroup from "../../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../../common/Input/InputLabel/InputLabel";
import InputSelect from "../../../common/Input/InputSelect/InputSelect";
import InputText from "../../../common/Input/InputText/InputText";
import InputTextArea from "../../../common/Input/InputTextArea/InputTextArea";
import Modal from "../../../common/Modal/Modal";
import ModalBody from "../../../common/ModalBody/ModalBody";
import ModalFooter from "../../../common/ModalFooter/ModalFooter";
import Page from "../../../common/Page/Page";
import PageBody from "../../../common/PageBody/PageBody";
import Toolbar from "../../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../../common/ToolbarItem/ToolbarItem";
import { PageRoute } from "../../../../services/PageRoute";

const fFmpegQualityPresets = {
  High: "veryslow",
  Medium: "medium",
  Low: "veryfast",
};

interface ExportVideoModalOptionsProps {
  onSubmit(ffmpegArguments: string): void;
  onVideoFilePathChange(videoFilePath: string): void;
}

const ExportVideoModalOptions = ({
  onSubmit,
  onVideoFilePathChange,
}: ExportVideoModalOptionsProps) => {
  const { project, take } = useProjectAndTake();

  const [currentFilePath, setCurrentFilePath] = useState("");
  const [qualityPreset, setQualityPreset] = useState(fFmpegQualityPresets.Medium);
  const [ffmpegArguments, setFFmpegArguments] = useState("");

  const changeExportLocation = async () => {
    const newFilePath = await window.preload.ipcToMain.openExportVideoFilePathDialog({
      currentFilePath,
    });
    setCurrentFilePath(newFilePath ?? "");
  };

  const startExportVideo = () => {
    onSubmit(ffmpegArguments);
  };

  useEffect(() => {
    const videoFilePath = window.preload.normalizePath(
      currentFilePath.endsWith(".mp4") ? currentFilePath : `${currentFilePath}.mp4`
    );
    onVideoFilePathChange(videoFilePath);

    const framePath = makeFrameFileName(take, parseInt("%05d this will be broken"));
    const totalFrames = getTrackLength(take.frameTrack);

    setFFmpegArguments(
      [
        "-y", // Overwrite output file if it already exists
        `-framerate ${take.frameRate}`,
        `-start_number 0`,
        `-i "${framePath}"`,
        `-frames:v ${totalFrames}`,
        "-c:v libx264",
        `-preset ${qualityPreset}`,
        "-crf 17",
        "-vf format=yuv420p",
        `"${videoFilePath}"`,
        "-hide_banner", // Hide FFmpeg library info from output
      ].join(" ")
    );
  }, [currentFilePath, onVideoFilePathChange, project, qualityPreset, take]);

  return (
    <Modal onClose={PageRoute.ANIMATOR}>
      <ModalBody>
        <Page>
          <PageBody>
            <Content>
              <ContentBlock title="Export Video">
                <InputGroup>
                  <InputLabel inputId="exportVideoFilePath">Export Location</InputLabel>

                  <InputGroup row noGap noMargin>
                    <InputText
                      id="exportVideoFilePath"
                      onChange={setCurrentFilePath}
                      value={currentFilePath}
                    />

                    <Button title="Browse..." onClick={changeExportLocation} borderRadius="right" />
                  </InputGroup>
                </InputGroup>

                <InputGroup>
                  <InputLabel inputId="exportVideoQualityPreset">Quality Preset</InputLabel>
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
                  <InputTextArea
                    id="exportVideoFFmpegArguments"
                    onChange={setFFmpegArguments}
                    value={ffmpegArguments}
                    rows={8}
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
              onClick={startExportVideo}
            />
          </ToolbarItem>
        </Toolbar>
      </ModalFooter>
    </Modal>
  );
};

export default ExportVideoModalOptions;
