import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { PageRoute } from "../../common/PageRoute";
import { listDevices } from "../services/imagingDevice/ImagingDevice";
import {
  editUserPreferences,
  setCameraAccess,
  startLoading,
  stopLoading,
} from "./slices/appSlice";
import {
  closeDevice,
  pauseDevice,
  reopenDevice,
  changeDevice,
  setDeviceList,
} from "./slices/captureSlice";
import { RootState } from "./store";

export const fetchAndSetDeviceList = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const connectedDevices = await listDevices();
      dispatch(setDeviceList(connectedDevices));
    })();
  };
};

export const setCurrentDeviceFromId = (deviceId?: string) => {
  return (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ) => {
    const { deviceList } = getState().capture;
    const identifier = deviceList.find(
      (identifier) => identifier.deviceId === deviceId
    );

    dispatch(identifier ? changeDevice(identifier) : closeDevice());

    return identifier;
  };
};

export const changeWorkingDirectory = (workingDirectory?: string) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const newDirectory = await window.preload.ipcToMain.openDirDialog({
        workingDirectory,
        title: "Select a directory to save captured frames",
      });

      dispatch(
        editUserPreferences({
          workingDirectory: newDirectory,
        })
      );

      return newDirectory;
    })();
  };
};

export const loadSavedPreferences = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const savedPreferences =
        await window.preload.ipcToMain.getUserPreferences();
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

export const withLoader = (
  loadingMessage: string,
  callback: () => Promise<void>
) => {
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
