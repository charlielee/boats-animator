import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const AppUnloader = (): JSX.Element => {
  const userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );
  const [ready, setReady] = useState(false);

  const openClosePrompt = (e: BeforeUnloadEvent) => {
    // This is a quirk of Chrome to prevent the window from closing
    e.returnValue = false;

    (async () => {
      const confirmClose =
        await window.preload.ipcToMain.settingsOpenConfirmPrompt(
          "Are you sure you want to exit Boats Animator?"
        );

      if (confirmClose) {
        window.removeEventListener("beforeunload", openClosePrompt);
        setReady(true);
      }
    })();
  };

  const cleanupAndClose = () => {
    window.preload.ipcToMain.settingsSave(userPreferences);
    window.close();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", openClosePrompt);

    return () => {
      window.removeEventListener("beforeunload", openClosePrompt);
    };
  }, []);

  useEffect(() => {
    if (ready) {
      cleanupAndClose();
    }
  }, [ready]);

  return <></>;
};

export default AppUnloader;
