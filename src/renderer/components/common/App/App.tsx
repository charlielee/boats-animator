import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import Animator from "../../animator/Animator/Animator";
import ExportVideoModal from "../../modals/ExportVideoModal/ExportVideoModal";
import PreferencesModal from "../../modals/PreferencesModal/PreferencesModal";
import ProjectSettingsModal from "../../modals/ProjectSettingsModal/ProjectSettingsModal";
import StartupModal from "../../modals/StartupModal/StartupModal";
import AppListener from "../AppListener/AppListener";
import AppLoad from "../AppLoad/AppLoad";

const App = (): JSX.Element => {
  return (
    <>
      <AppListener />
      <AppLoad />

      <Routes>
        <Route index element={<Navigate to={PageRoute.STARTUP_MODAL} />} />

        <Route path={PageRoute.STARTUP_MODAL} element={<StartupModal />} />

        <Route path={PageRoute.PREFERENCES_MODAL} element={<PreferencesModal />} />

        <Route path={PageRoute.PROJECT_SETTINGS_MODAL} element={<ProjectSettingsModal />} />

        <Route
          path={PageRoute.ANIMATOR}
          element={
            <>
              <Outlet />
              <Animator />
            </>
          }
        >
          <Route path={PageRoute.EXPORT_VIDEO_MODAL} element={<ExportVideoModal />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
