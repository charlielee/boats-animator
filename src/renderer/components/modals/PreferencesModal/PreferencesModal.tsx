import { useDispatch, useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { editUserPreferences } from "../../../redux/app/actions";
import { RootState } from "../../../redux/store";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputSwitch from "../../common/Input/InputSwitch/InputSwitch";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";

const PreferencesModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const { take, userPreferences } = useSelector((state: RootState) => ({
    take: state.project.take,
    userPreferences: state.app.userPreferences,
  }));
  return (
    <Modal onClose={take ? PageRoute.ANIMATOR : PageRoute.STARTUP_MODAL}>
      <ModalBody>
        <Page>
          <PageBody>
            <Content>
              <ContentBlock title="Preferences">
                <InputGroup row>
                  <InputSwitch
                    id="preferencesPlayCaptureSound"
                    checked={userPreferences.playCaptureSound}
                    onChange={() =>
                      dispatch(
                        editUserPreferences({
                          playCaptureSound: !userPreferences.playCaptureSound,
                        })
                      )
                    }
                  />
                  <InputLabel inputId="preferencesPlayCaptureSound">
                    Play capture sound
                  </InputLabel>
                </InputGroup>
              </ContentBlock>
            </Content>
          </PageBody>
        </Page>
      </ModalBody>
    </Modal>
  );
};

export default PreferencesModal;
