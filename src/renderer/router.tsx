import { createHashRouter, Outlet, redirect } from "react-router-dom";
import { Animator } from "./components/animator/Animator/Animator";
import App from "./components/common/App/App";
import { NewProjectModal } from "./components/modals/NewProjectModal/NewProjectModal";
import PreferencesModal from "./components/modals/PreferencesModal/PreferencesModal";
import { StartupPage } from "./components/startup/StartupPage/StartupPage";
import { UiModal } from "./components/ui/UiModal/UiModal";
import CaptureContextProvider from "./context/CaptureContext/CaptureContextProvider";
import { ImagingDeviceContextProvider } from "./context/ImagingDeviceContext/ImagingDeviceContextProvider";
import PlaybackContextProvider from "./context/PlaybackContext/PlaybackContextProvider";
import { ProjectFilesContextProvider } from "./context/ProjectFilesContext.tsx/ProjectFilesContextProvider";
import { CaptureSourceModal } from "./components/modals/CaptureSourceModal/CaptureSourceModal";
import { DeleteFrameModal } from "./components/modals/DeleteFrameModal/DeleteFrameModal";
import ExportVideoModal from "./components/modals/ExportVideoModal/ExportVideoModal";

export const router = createHashRouter([
  {
    element: <App />,
    errorElement: (
      <UiModal title="Page Not Found">
        <p>
          Unable to find the requested page. Please restart Boats Animator and raise an issue if
          this issue keeps occurring.
        </p>
      </UiModal>
    ),
    children: [
      {
        index: true,
        loader: async () => redirect("/startup"),
      },
      {
        path: "/startup",
        element: (
          <>
            <Outlet />
            <StartupPage />
          </>
        ),
        children: [
          { path: "/startup/preferencesModal", element: <PreferencesModal /> },
          { path: "/startup/newProjectModal", element: <NewProjectModal /> },
        ],
      },
      {
        path: "/animator",
        element: (
          <ProjectFilesContextProvider>
            <ImagingDeviceContextProvider>
              <CaptureContextProvider>
                <PlaybackContextProvider>
                  <Outlet />
                  <Animator />
                </PlaybackContextProvider>
              </CaptureContextProvider>
            </ImagingDeviceContextProvider>
          </ProjectFilesContextProvider>
        ),
        children: [
          {
            path: "/animator/captureSource",
            element: <CaptureSourceModal />,
          },
          { path: "/animator/deleteFrame", element: <DeleteFrameModal /> },
          { path: "/animator/exportVideoModal", element: <ExportVideoModal /> },
          { path: "/animator/preferencesModal", element: <PreferencesModal /> },
        ],
      },
    ],
  },
]);
