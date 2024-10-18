import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import Animator from "../../animator/Animator/Animator";
import ExportVideoModal from "../../modals/ExportVideoModal/ExportVideoModal";
import PreferencesModal from "../../modals/PreferencesModal/PreferencesModal";
import ProjectSettingsModal from "../../modals/ProjectSettingsModal/ProjectSettingsModal";
import StartupModal from "../../modals/StartupModal/StartupModal";
import AppListener from "../AppListener/AppListener";
import AppLoad from "../AppLoad/AppLoad";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { FileManagerContextProvider } from "../../../context/FileManagerContext/FileManagerContextProvider";
import { ProjectFilesContextProvider } from "../../../context/ProjectFilesContext.tsx/ProjectFilesContextProvider";
import { RecentDirectoriesContextProvider } from "../../../context/RecentDirectoriesContext/RecentDirectoriesContextProvider";

const App = (): JSX.Element => {
  const { project, take } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    document.title = project ? `${project.name} - Boats Animator` : "Boats Animator";
  }, [project]);

  return (
    <>
      <AppListener />
      <AppLoad />

      <FileManagerContextProvider>
        <RecentDirectoriesContextProvider>
          <ProjectFilesContextProvider>
            <Routes>
              <Route index element={<Navigate to={PageRoute.STARTUP_MODAL} />} />

              <Route path={PageRoute.STARTUP_MODAL} element={<StartupModal />} />

              <Route
                path={PageRoute.ANIMATOR}
                element={
                  <>
                    <Outlet />
                    {project && take && <Animator />}
                  </>
                }
              >
                <Route path={PageRoute.EXPORT_VIDEO_MODAL} element={<ExportVideoModal />} />
                <Route path={PageRoute.PREFERENCES_MODAL} element={<PreferencesModal />} />
                <Route path={PageRoute.PROJECT_SETTINGS_MODAL} element={<ProjectSettingsModal />} />
              </Route>
            </Routes>
          </ProjectFilesContextProvider>
        </RecentDirectoriesContextProvider>
      </FileManagerContextProvider>
    </>
  );
};

export default App;
