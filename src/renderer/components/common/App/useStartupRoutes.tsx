import { Outlet, Route } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { NewProjectModal } from "../../modals/NewProjectModal/NewProjectModal";
import PreferencesModal from "../../modals/PreferencesModal/PreferencesModal";
import { StartupPage } from "../../startup/StartupPage/StartupPage";

export const useStartupRoutes = () => (
  <Route
    path={PageRoute.STARTUP}
    element={
      <>
        <Outlet></Outlet>
        <StartupPage />
      </>
    }
  >
    <Route path={PageRoute.STARTUP_NEW_PROJECT_MODAL} element={<NewProjectModal />} />
    <Route path={PageRoute.STARTUP_PREFERENCES_MODAL} element={<PreferencesModal />} />
  </Route>
);
