import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { editUserPreferences } from "../../../redux/slices/appSlice";
import { RootState } from "../../../redux/store";
import Button from "../../common/Button/Button";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputNumber from "../../common/Input/InputNumber/InputNumber";
import InputSwitch from "../../common/Input/InputSwitch/InputSwitch";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import ModalFooter from "../../common/ModalFooter/ModalFooter";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";

const PreferencesModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const { take, userPreferences } = useSelector((state: RootState) => ({
    take: state.project.take,
    userPreferences: state.app.userPreferences,
  }));
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    (async () => {
      const version = await window.preload.ipcToMain.appVersion();
      setAppVersion(version);
    })();
  }, []);

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
                  <InputLabel inputId="preferencesPlayCaptureSound">Play capture sound</InputLabel>
                </InputGroup>

                <InputGroup row>
                  <InputLabel inputId="preferencesShortPlayLength">Short play length</InputLabel>
                  <InputNumber
                    id="preferencesShortPlayLength"
                    min={1}
                    max={99}
                    value={userPreferences.shortPlayLength}
                    onChange={(newValue) =>
                      dispatch(
                        editUserPreferences({
                          shortPlayLength: newValue,
                        })
                      )
                    }
                    validateOnChange
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
              title="Open user data folder"
              icon={IconName.FOLDER}
              onClick={window.preload.ipcToMain.openUserDataDirectory}
            />
          </ToolbarItem>
          <ToolbarItem align={ToolbarItemAlign.RIGHT}>Version {appVersion}</ToolbarItem>
        </Toolbar>
      </ModalFooter>
    </Modal>
  );
};

export default PreferencesModal;
