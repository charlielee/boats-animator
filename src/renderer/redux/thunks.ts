import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { PageRoute } from "../../common/PageRoute";
import { listDevices } from "../services/imagingDevice/ImagingDevice";
import * as rLogger from "../services/rLogger/rLogger";
import { changeDevice, closeDevice, openDevice } from "./capture/actions";
import { editUserPreferences, setCameraAccess } from "./slices/appSlice";
import { setCurrentDevice, setDeviceList } from "./slices/captureSlice";
import { RootState } from "./store";

export const fetchAndSetDeviceList = () => {
  return (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ) => {
    const { currentDeviceIdentifier } = getState().capture;

    return (async () => {
      const connectedDevices = await listDevices();
      dispatch(setDeviceList(connectedDevices));

      const currentDeviceConnected =
        currentDeviceIdentifier &&
        connectedDevices.find(
          (device) => device.deviceId === currentDeviceIdentifier.deviceId
        );

      if (currentDeviceIdentifier && !currentDeviceConnected) {
        rLogger.info("thunks.fetchAndSetDeviceList.currentDeviceRemoved");
        dispatch(changeDevice());
      }
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

    dispatch(setCurrentDevice(identifier));

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
        dispatch(openDevice());
        return;
      }
      default: {
        // Pause streaming when a modal is open
        dispatch(closeDevice());
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