import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";

const PreferencesModal = (): JSX.Element => {
  return (
    <Modal>
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
