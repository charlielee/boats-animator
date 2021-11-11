import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { handleOnCloseButtonClick } from "../../../services/appListener/AppListenerService";

const AppListeners = (): JSX.Element => {
  const userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );

  useEffect(() => {
    window.preload.ipcToRenderer.onCloseButtonClick(() =>
      handleOnCloseButtonClick(userPreferences)
    );
  }, []);
  return <></>;
};

export default AppListeners;
