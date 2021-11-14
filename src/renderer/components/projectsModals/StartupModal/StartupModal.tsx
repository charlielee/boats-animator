import { useEffect, useState } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import Button from "../../common/Button/Button";
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import ModalFooter from "../../common/ModalFooter/ModalFooter";
import ModalHeader from "../../common/ModalHeader/ModalHeader";

const StartupModal = (): JSX.Element => {
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    (async () => {
      const version = await window.preload.ipcToMain.appVersion();
      setAppVersion(version);
    })();
  }, []);

  return (
    <Modal>
      <ModalHeader title="Projects" />
      <ModalBody>
        <Content>
          <ContentBlock>Hi</ContentBlock>
        </Content>
      </ModalBody>

      <ModalFooter>
        <ButtonGroup>
          <Button
            title="New Project"
            icon={IconName.ADD}
            onClick={PageRoute.ANIMATOR}
          />

          <Button
            title="Open Project"
            icon={IconName.FOLDER}
            onClick={() => console.log("todo")}
          />
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};

export default StartupModal;
