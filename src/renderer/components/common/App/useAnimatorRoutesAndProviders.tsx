import { useSelector } from "react-redux";
import { Outlet, Route } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import CaptureContextProvider from "../../../context/CaptureContext/CaptureContextProvider";
import PlaybackContextProvider from "../../../context/PlaybackContext/PlaybackContextProvider";
import { RootState } from "../../../redux/store";
import { Animator } from "../../animator/Animator/Animator";
import { DeleteFrameModal } from "../../modals/DeleteFrameModal/DeleteFrameModal";
import ExportVideoModal from "../../modals/ExportVideoModal/ExportVideoModal";
import PreferencesModal from "../../modals/PreferencesModal/PreferencesModal";
import { useEffect } from "react";
import { ProjectFilesContextProvider } from "../../../context/ProjectFilesContext.tsx/ProjectFilesContextProvider";

export const useAnimatorRoutesAndProviders = () => {
  const project = useSelector((state: RootState) => state.project.project);
  const take = useSelector((state: RootState) => state.project.take);
  const shortPlayLength = useSelector(
    (state: RootState) => state.app.userPreferences.shortPlayLength
  );
  const playbackSpeed = useSelector((state: RootState) => state.project.playbackSpeed);

  useEffect(() => {
    document.title = project ? `${project.name} - Boats Animator` : "Boats Animator";
  }, [project]);

  if (project === undefined || take === undefined) {
    return <></>;
  }

  return (
    <Route
      path={PageRoute.ANIMATOR}
      element={
        <ProjectFilesContextProvider>
          <CaptureContextProvider>
            <PlaybackContextProvider
              take={take}
              shortPlayLength={shortPlayLength}
              playbackSpeed={playbackSpeed}
            >
              <Outlet />
              <Animator />
            </PlaybackContextProvider>
          </CaptureContextProvider>
        </ProjectFilesContextProvider>
      }
    >
      <Route path={PageRoute.ANIMATOR_DELETE_FRAME} element={<DeleteFrameModal />} />
      <Route path={PageRoute.ANIMATOR_EXPORT_VIDEO_MODAL} element={<ExportVideoModal />} />
      <Route path={PageRoute.ANIMATOR_PREFERENCES_MODAL} element={<PreferencesModal />} />
    </Route>
  );
};
