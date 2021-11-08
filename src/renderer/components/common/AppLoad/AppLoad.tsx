import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPreferences } from "../../../services/userPreferences/UserPreferencesApi";

const AppLoad = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadPreferences(dispatch);
  }, []);

  return <></>;
};

export default AppLoad;
