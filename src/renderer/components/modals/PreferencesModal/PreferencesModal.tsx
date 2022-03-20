import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { RootState } from "../../../redux/store";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";

const PreferencesModal = (): JSX.Element => {
  const take = useSelector((state: RootState) => state.project.take);
  return (
    <Modal onClose={take ? PageRoute.ANIMATOR : PageRoute.STARTUP_MODAL}>
      <ModalBody>
        <Page>
          <PageBody>
            <Content>
              <ContentBlock title="Preferences">Hi</ContentBlock>
            </Content>
          </PageBody>
        </Page>
      </ModalBody>
    </Modal>
  );
};

export default PreferencesModal;
