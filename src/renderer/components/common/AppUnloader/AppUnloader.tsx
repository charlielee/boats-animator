import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const AppUnloader = (): JSX.Element => {
  const userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );

  const cleanupAndClose = (e: BeforeUnloadEvent) => {
    // This is a quirk of Chrome to prevent the window from closing
    e.returnValue = false;

    (async () => {
      const confirmClose =
        await window.preload.ipc.SETTINGS_OPEN_CONFIRM_PROMPT(
          "Are you sure you want to exit Boats Animator?"
        );

      if (confirmClose) {
        window.preload.ipc.SETTINGS_SAVE(userPreferences);
        window.removeEventListener("beforeunload", cleanupAndClose);
        window.close();
      }
    })();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", cleanupAndClose);

    return () => {
      window.removeEventListener("beforeunload", cleanupAndClose);
    };
  }, []);

  return <></>;
};

export default AppUnloader;
