import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { PageRoute } from "../../common/PageRoute";
import { editUserPreferences, setCameraAccess, startLoading, stopLoading } from "./slices/appSlice";
import { pauseDevice, reopenDevice } from "./slices/captureSlice";
import { RootState } from "./store";
import { formatProjectName, makeTake } from "../services/project/projectBuilder";
import { addProject, addTake } from "./slices/projectSlice";
import { Project } from "../../common/project/Project";
import { db } from "../services/database/Database";

export const changeWorkingDirectory = (workingDirectory?: string) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const newDirectory = await window.preload.ipcToMain.openDirDialog({
        workingDirectory,
        title: "Select a directory to save projects to",
      });

      dispatch(
        editUserPreferences({
          defaultWorkingDirectory: newDirectory,
        })
      );

      return newDirectory;
    })();
  };
};

export const loadSavedPreferences = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const savedPreferences = await window.preload.ipcToMain.getUserPreferences();
      dispatch(editUserPreferences(savedPreferences));
    })();
  };
};

export const onRouteChange = (route: PageRoute) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    switch (route) {
      case PageRoute.ANIMATOR: {
        dispatch(reopenDevice());
        return;
      }
      default: {
        // Pause streaming when a modal is open
        dispatch(pauseDevice());
        return;
      }
    }
  };
};

export const updateCameraAccessStatus = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const hasAccess = await window.preload.ipcToMain.checkCameraAccess();
      dispatch(setCameraAccess(hasAccess));
      return hasAccess;
    })();
  };
};

export const withLoader = (loadingMessage: string, callback: () => Promise<void>) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      try {
        dispatch(startLoading(loadingMessage));
        await callback();
      } finally {
        dispatch(stopLoading());
      }
    })();
  };
};

export const newProject = (project: Project) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const name = formatProjectName(project.name);

      dispatch(addProject({ ...project, name }));
      dispatch(
        addTake(
          makeTake({
            shotNumber: 1,
            takeNumber: 1,
            frameRate: 15,
          })
        )
      );
      // Todo async behave not quite right
      // Todo review the hook related to useLiveQuery
      const fileSystemDirectoryHandle = await window.showDirectoryPicker({
        id: "newProject",
        mode: "readwrite",
        startIn: "documents",
      });

      await db.recentProjects.add(
        { id: project.id, name: project.name, fileSystemDirectoryHandle },
        project.id
      );
    })();
  };
};
