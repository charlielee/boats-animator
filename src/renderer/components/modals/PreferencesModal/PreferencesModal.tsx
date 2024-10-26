import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { editUserPreferences } from "../../../redux/slices/appSlice";
import { RootState } from "../../../redux/store";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import ModalFooter from "../../common/ModalFooter/ModalFooter";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import { UiButton } from "../../ui/UiButton/UiButton";
import { UiNumberInput } from "../../ui/UiNumberInput/UiNumberInput";
import { UiSwitch } from "../../ui/UiSwitch/UiSwitch";

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
    <Modal onClose={take ? PageRoute.ANIMATOR : PageRoute.STARTUP_PAGE}>
      <ModalBody>
        <Page>
          <PageBody>
            <Content>
              <ContentBlock title="Preferences">
                <h3>Interface</h3>

                <Stack>
                  <UiSwitch
                    label="Play capture sound"
                    checked={userPreferences.playCaptureSound}
                    onChange={() =>
                      dispatch(
                        editUserPreferences({
                          playCaptureSound: !userPreferences.playCaptureSound,
                        })
                      )
                    }
                  />

                  <UiSwitch
                    label="Initially show timestamp in seconds rather than frames"
                    checked={userPreferences.showTimestampInSeconds}
                    onChange={() =>
                      dispatch(
                        editUserPreferences({
                          showTimestampInSeconds: !userPreferences.showTimestampInSeconds,
                        })
                      )
                    }
                  />
                </Stack>

                <h3>Playback</h3>

                <UiNumberInput
                  label="Short play length"
                  value={userPreferences.shortPlayLength}
                  placeholder="6"
                  min={1}
                  max={99}
                  onChange={(newValue) =>
                    dispatch(
                      editUserPreferences({
                        shortPlayLength: newValue,
                      })
                    )
                  }
                />
              </ContentBlock>
            </Content>
          </PageBody>
        </Page>
      </ModalBody>

      <ModalFooter>
        <Toolbar borderTop>
          <ToolbarItem align={ToolbarItemAlign.LEFT}>
            <UiButton
              icon={IconName.FOLDER}
              onClick={window.preload.ipcToMain.openUserDataDirectory}
            >
              Open user data folder
            </UiButton>
          </ToolbarItem>
          <ToolbarItem align={ToolbarItemAlign.RIGHT}>Version {appVersion}</ToolbarItem>
        </Toolbar>
      </ModalFooter>
    </Modal>
  );
};

export default PreferencesModal;
