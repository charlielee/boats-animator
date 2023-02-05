import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { RootState } from "../../../redux/store";
import Animator from "../../animator/Animator/Animator";
import ExportVideoModal from "../../modals/ExportVideoModal/ExportVideoModal";
import PreferencesModal from "../../modals/PreferencesModal/PreferencesModal";
import StartupModal from "../../modals/StartupModal/StartupModal";
import AppListener from "../AppListener/AppListener";
import AppLoad from "../AppLoad/AppLoad";

const App = (): JSX.Element => {
  const take = useSelector((state: RootState) => state.project.take);

  return (
    <>
      <AppListener />
      <AppLoad />

      <Routes>
        <Route index element={<Navigate to={PageRoute.STARTUP_MODAL} />} />

        <Route
          path={PageRoute.ANIMATOR}
          element={
            <>
              <Outlet />
              {take && <Animator take={take} />}
            </>
          }
        >
          <Route path={PageRoute.STARTUP_MODAL} element={<StartupModal />} />

          <Route path={PageRoute.PREFERENCES_MODAL} element={<PreferencesModal />} />

          {take && (
            <Route path={PageRoute.EXPORT_VIDEO_MODAL} element={<ExportVideoModal take={take} />} />
          )}
        </Route>
      </Routes>
    </>
  );
};

export default App;
