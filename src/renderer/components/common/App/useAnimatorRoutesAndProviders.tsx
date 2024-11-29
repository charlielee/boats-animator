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
import { CaptureSourceModal } from "../../modals/CaptureSourceModal/CaptureSourceModal";
import { displayProjectTitle } from "../../../services/project/projectBuilder";
import { ImagingDeviceContextProvider } from "../../../context/ImagingDeviceContext/ImagingDeviceContextProvider";

export const useAnimatorRoutesAndProviders = () => {
  const project = useSelector((state: RootState) => state.project.project);
  const take = useSelector((state: RootState) => state.project.take);

  useEffect(() => {
    document.title = project
      ? `${displayProjectTitle(project)} - Boats Animator`
      : "Boats Animator";
  }, [project]);

  if (project === undefined || take === undefined) {
    return <></>;
  }

  return (
    <Route
      path={PageRoute.ANIMATOR}
      element={
        <ProjectFilesContextProvider>
          <ImagingDeviceContextProvider>
            <CaptureContextProvider>
              <PlaybackContextProvider take={take}>
                <Outlet />
                <Animator />
              </PlaybackContextProvider>
            </CaptureContextProvider>
          </ImagingDeviceContextProvider>
        </ProjectFilesContextProvider>
      }
    >
      <Route path={PageRoute.ANIMATOR_CAPTURE_SOURCE} element={<CaptureSourceModal />} />
      <Route path={PageRoute.ANIMATOR_DELETE_FRAME} element={<DeleteFrameModal />} />
      <Route path={PageRoute.ANIMATOR_EXPORT_VIDEO_MODAL} element={<ExportVideoModal />} />
      <Route path={PageRoute.ANIMATOR_PREFERENCES_MODAL} element={<PreferencesModal />} />
    </Route>
  );
};
