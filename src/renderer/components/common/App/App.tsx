import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import Animator from "../../animator/Animator/Animator";
import ExportVideoModal from "../../modals/ExportVideoModal/ExportVideoModal";
import PreferencesModal from "../../modals/PreferencesModal/PreferencesModal";
import ProjectSettingsModal from "../../modals/ProjectSettingsModal/ProjectSettingsModal";
import { StartupPage } from "../../startup/StartupPage/StartupPage";
import AppListener from "../AppListener/AppListener";
import AppLoad from "../AppLoad/AppLoad";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { FileManagerContextProvider } from "../../../context/FileManagerContext/FileManagerContextProvider";
import { ProjectFilesContextProvider } from "../../../context/ProjectFilesContext.tsx/ProjectFilesContextProvider";
import { PersistedDirectoriesContextProvider } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesContextProvider";
import { Theme } from "../../ui/Theme/Theme";
import { ManageTakesDrawer } from "../../modals/ManageTakesDrawer/ManageTakesDrawer";

const App = (): JSX.Element => {
  const { project, take } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    document.title = project ? `${project.name} - Boats Animator` : "Boats Animator";
  }, [project]);

  return (
    <Theme>
      <AppListener />
      <AppLoad />

      <FileManagerContextProvider>
        <PersistedDirectoriesContextProvider>
          <ProjectFilesContextProvider>
            <Routes>
              <Route index element={<Navigate to={PageRoute.STARTUP} />} />

              <Route
                path={PageRoute.STARTUP}
                element={
                  <>
                    <Outlet></Outlet>
                    <StartupPage />
                  </>
                }
              >
                <Route
                  path={PageRoute.STARTUP_NEW_PROJECT_MODAL}
                  element={<ProjectSettingsModal />}
                />
                <Route path={PageRoute.STARTUP_PREFERENCES_MODAL} element={<PreferencesModal />} />
              </Route>

              <Route
                path={PageRoute.ANIMATOR}
                element={
                  <>
                    <Outlet />
                    {project && take && <Animator />}
                  </>
                }
              >
                <Route
                  path={PageRoute.ANIMATOR_MANAGE_TAKES_DRAWER}
                  element={<ManageTakesDrawer />}
                />
                <Route
                  path={PageRoute.ANIMATOR_PROJECT_SETTINGS_MODAL}
                  element={<ProjectSettingsModal />}
                />
                <Route
                  path={PageRoute.ANIMATOR_EXPORT_VIDEO_MODAL}
                  element={<ExportVideoModal />}
                />
                <Route path={PageRoute.ANIMATOR_PREFERENCES_MODAL} element={<PreferencesModal />} />
              </Route>
            </Routes>
          </ProjectFilesContextProvider>
        </PersistedDirectoriesContextProvider>
      </FileManagerContextProvider>
    </Theme>
  );
};

export default App;
