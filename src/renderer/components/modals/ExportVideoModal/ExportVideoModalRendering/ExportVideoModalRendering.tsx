import { useEffect, useState } from "react";
import { PageRoute } from "../../../../../common/PageRoute";
import Button from "../../../common/Button/Button";
import { ButtonColor } from "../../../common/Button/ButtonColor";
import Content from "../../../common/Content/Content";
import ContentBlock from "../../../common/ContentBlock/ContentBlock";
import InputGroup from "../../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../../common/Input/InputLabel/InputLabel";
import InputTextArea from "../../../common/Input/InputTextArea/InputTextArea";
import Modal from "../../../common/Modal/Modal";
import ModalBody from "../../../common/ModalBody/ModalBody";
import ModalFooter from "../../../common/ModalFooter/ModalFooter";
import Page from "../../../common/Page/Page";
import PageBody from "../../../common/PageBody/PageBody";
import Toolbar from "../../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../../common/ToolbarItem/ToolbarItem";

interface ExportVideoModalRenderingProps {
  ffmpegArguments: string;
}

const ExportVideoModalRendering = ({
  ffmpegArguments,
}: ExportVideoModalRenderingProps): JSX.Element => {
  const [data, setData] = useState("");
  const [exitCode, setExitCode] = useState("");

  useEffect(() => {
    (async () => {
      // TODO: take should be conformed before export

      // The render method expects an array so convert input from string into array
      // Regexes are to handle arguments in quotes
      // https://stackoverflow.com/a/56119602
      const argumentsArray = ffmpegArguments
        .match(/[^\s"']+|"([^"]*)"/gim)
        ?.map((arg: string) => arg.replace(/"|'/g, ""));

      const exitCode = await window.preload.ipcToMain.exportVideoStart({
        ffmpegArgs: argumentsArray ?? [],
      });
      setExitCode(exitCode.toString());
    })();
  }, []);

  useEffect(() => {
    return window.preload.ipcToRenderer.onExportVideoData((data) => {
      if (data.data.trim() !== "") {
        setData((prevState) => (prevState += `${data.data.trim()}\n-\n`));
      }
    });
  }, []);

  const isCompleted = () => exitCode !== "";

  return (
    <Modal onClose={isCompleted() ? PageRoute.ANIMATOR : undefined}>
      <ModalBody>
        <Page>
          <PageBody>
            <Content>
              <ContentBlock title="Export Video">
                <InputGroup>
                  <InputLabel inputId="exportVideoDataDisplay">
                    Exporting video...
                  </InputLabel>

                  <InputTextArea
                    id="exportVideoDataDisplay"
                    value={data}
                    onChange={() => undefined}
                    disabled
                    rows={16}
                  />
                </InputGroup>
              </ContentBlock>
            </Content>
          </PageBody>
        </Page>
      </ModalBody>

      {isCompleted() && (
        <ModalFooter>
          <Toolbar borderTop>
            <ToolbarItem align={ToolbarItemAlign.LEFT}>
              <Button
                title="OK"
                color={ButtonColor.PRIMARY}
                onClick={PageRoute.ANIMATOR}
              />
            </ToolbarItem>
          </Toolbar>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default ExportVideoModalRendering;
