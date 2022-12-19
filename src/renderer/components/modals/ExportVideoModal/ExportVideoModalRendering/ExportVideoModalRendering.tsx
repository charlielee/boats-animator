import { useEffect, useState } from "react";
import { PageRoute } from "../../../../../common/PageRoute";
import { stringToArray } from "../../../../../common/utils";
import Button from "../../../common/Button/Button";
import { ButtonColor } from "../../../common/Button/ButtonColor";
import Content from "../../../common/Content/Content";
import ContentBlock from "../../../common/ContentBlock/ContentBlock";
import IconName from "../../../common/Icon/IconName";
import InputGroup from "../../../common/Input/InputGroup/InputGroup";
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
  originalVideoFilePath: string;
}

const ExportVideoModalRendering = ({
  ffmpegArguments,
  originalVideoFilePath,
}: ExportVideoModalRenderingProps): JSX.Element => {
  const [data, setData] = useState("");
  const [videoFilePath, setVideoFilePath] = useState(originalVideoFilePath);
  const [exitCode, setExitCode] = useState<undefined | number>(undefined);
  const isCompleted = exitCode !== undefined;
  const isCompletedSuccessfully = exitCode === 0;

  useEffect(() => {
    (async () => {
      // TODO: take should be conformed before export

      const response = await window.preload.ipcToMain.exportVideoStart({
        ffmpegArguments: stringToArray(ffmpegArguments) ?? [],
        videoFilePath,
      });

      // Update video path in case it was renamed to prevent overwriting
      setVideoFilePath(response.videoFilePath);
      setExitCode(response.code);
    })();

    return window.preload.ipcToRenderer.onExportVideoData((data) => {
      if (data.data.trim() !== "") {
        setData((prevState) => (prevState += `${data.data.trim()}\n-\n`));
      }
    });
  }, [ffmpegArguments, videoFilePath]);

  const fileManagerName = () => {
    switch (window.preload.platform) {
      case "darwin":
        return "Finder";
      case "win32":
        return "File Explorer";
      default:
        return "file manager";
    }
  };

  const modalHeading = (): {
    onClose: undefined | PageRoute;
    title: string;
    titleIcon: undefined | IconName;
  } => {
    if (!isCompleted) {
      return {
        onClose: undefined,
        title: "Exporting Video...",
        titleIcon: undefined,
      };
    } else if (isCompletedSuccessfully) {
      return {
        onClose: PageRoute.ANIMATOR,
        title: "Export Video Completed",
        titleIcon: IconName.SUCCESS,
      };
    } else {
      return {
        onClose: PageRoute.ANIMATOR,
        title: "Error Exporting Video",
        titleIcon: IconName.ERROR,
      };
    }
  };

  return (
    <Modal onClose={modalHeading().onClose}>
      <ModalBody>
        <Page>
          <PageBody>
            <Content>
              <ContentBlock
                title={modalHeading().title}
                titleIcon={modalHeading().titleIcon}
              >
                <InputGroup>
                  <InputTextArea
                    value={data}
                    onChange={() => undefined}
                    disabled
                    autoScroll
                    rows={14}
                  />
                </InputGroup>

                {isCompleted && !isCompletedSuccessfully && (
                  <span>
                    An error occurred when exporting video. Please try again
                    later. Exit code {exitCode}.
                  </span>
                )}
              </ContentBlock>
            </Content>
          </PageBody>
        </Page>
      </ModalBody>

      {isCompleted && (
        <ModalFooter>
          <Toolbar borderTop>
            <ToolbarItem align={ToolbarItemAlign.LEFT}>
              <Button
                title="OK"
                color={ButtonColor.PRIMARY}
                onClick={PageRoute.ANIMATOR}
              />
            </ToolbarItem>

            {isCompletedSuccessfully && (
              <ToolbarItem align={ToolbarItemAlign.RIGHT}>
                <Button
                  title={`View in ${fileManagerName()}`}
                  onClick={() =>
                    window.preload.ipcToMain.showItemInFolder({
                      filePath: videoFilePath,
                    })
                  }
                />
              </ToolbarItem>
            )}
          </Toolbar>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default ExportVideoModalRendering;
