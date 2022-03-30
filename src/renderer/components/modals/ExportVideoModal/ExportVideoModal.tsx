import { PageRoute } from "../../../../common/PageRoute";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputNumber from "../../common/Input/InputNumber/InputNumber";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";

const ExportVideoModal = (): JSX.Element => {
  return (
    <Modal onClose={PageRoute.ANIMATOR}>
      <ModalBody>
        <Page>
          <PageBody>
            <Content>
              <ContentBlock title="Export Video">
                <InputGroup>
                  <InputLabel inputId="exportVideoLocation">
                    Export location
                  </InputLabel>
                  <InputNumber
                    id="exportVideoLocation"
                    min={0}
                    max={1}
                    onChange={(n) => console.log(n)}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLabel inputId="exportVideoQualityPreset">
                    FFmpeg quality preset
                  </InputLabel>
                  <InputNumber
                    id="exportVideoQualityPreset"
                    min={0}
                    max={1}
                    onChange={(n) => console.log(n)}
                  />
                </InputGroup>
              </ContentBlock>
            </Content>
          </PageBody>
        </Page>
      </ModalBody>
    </Modal>
  );
};

export default ExportVideoModal;
