import { Group, Stack } from "@mantine/core";
import { useState } from "react";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import NewsFeed from "../NewsFeed/NewsFeed";
import { PageRoute } from "../../../services/PageRoute";
import * as rLogger from "../../../services/rLogger/rLogger";

import { useFileManagerContext } from "../../../context/FileManagerContext/FileManagerContext";
import { useNavigate } from "react-router-dom";
import {  useProjectFilesContext } from "../../../context/ProjectFilesContext.tsx/ProjectFilesContext";
import { UiAlert } from "../../ui/UiAlert/UiAlert";
import { ProjectInfoFileV1 } from "../../../services/project/types";


export const StartupPage = () => {
  const navigate = useNavigate();
  const {unpackProjectInfoFileJSON, dispatchLoadedProjectInfo} = useProjectFilesContext();

  const {openDirectoryDialog} = useFileManagerContext()

  let boatsinfoHandler : FileSystemDirectoryHandle | undefined = undefined;

  const [generalError, setGeneralError] = useState<string | undefined>(undefined);

  const onManuallyChooseProjectFolder = async () => {
    setGeneralError(undefined);
    boatsinfoHandler = await openDirectoryDialog("loadBoatsinfoFile");

    if (boatsinfoHandler == undefined){
      return;
    }
    try{
      const projectInfo: ProjectInfoFileV1 = await unpackProjectInfoFileJSON(boatsinfoHandler);
      const chosenTake = projectInfo.takes[0];
      await dispatchLoadedProjectInfo(boatsinfoHandler,projectInfo, chosenTake);
      navigate(PageRoute.ANIMATOR_CAPTURE_SOURCE);  
    }catch(e){
      if (e instanceof Error){
        setGeneralError(e.message);
        rLogger.error("startupPage.unknownError",e.message);
      }else if (typeof e === "string"){
        setGeneralError(e);
        rLogger.error("startupPage.unknownError", e);
      }else{
        setGeneralError(
          "Unable to load project due to an unexpected error. Please choose a different folder and try again."
        );
        rLogger.error("startupPage.unknownError");
      }
    }
  };

  return (
  <Page>
    <PageBody>
      <Content>
        <ContentBlock title="Welcome to Boats Animator!">
          <Stack justify="stretch" flex={1}>
            <Group>
              <UiButton
                icon={IconName.ADD}
                onClick={PageRoute.STARTUP_NEW_PROJECT_MODAL}
                semanticColor={SemanticColor.PRIMARY}
              >
                New Project
              </UiButton>
              <UiButton icon={IconName.FOLDER} onClick={onManuallyChooseProjectFolder}>Open Project</UiButton>
            </Group>
            <UiButton icon={IconName.SETTINGS} onClick={PageRoute.STARTUP_PREFERENCES_MODAL}>
              Preferences
            </UiButton>
            <UiAlert title="Error loading project" semanticColor={SemanticColor.DANGER}>
              {generalError}
            </UiAlert>
          </Stack>
        </ContentBlock>
      </Content>

      <Sidebar>
        <SidebarBlock title="News">
          <NewsFeed />
        </SidebarBlock>
      </Sidebar>
    </PageBody>
  </Page>
);
};
