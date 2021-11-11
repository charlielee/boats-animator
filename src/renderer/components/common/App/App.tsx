import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import Animator from "../../../pages/Animator/Animator";
import Launcher from "../../../pages/Launcher/Launcher";
import { loadPreferences } from "../../../services/userPreferences/UserPreferencesApi";
import AppListeners from "../AppListener/AppListener";
import AppLoad from "../AppLoad/AppLoad";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadPreferences(dispatch);
  }, []);

  return (
    <>
      <AppListeners />
      <AppLoad />

      <Switch>
        <Route exact path={PageRoute.LAUNCHER} component={Launcher} />
        <Route exact path={PageRoute.ANIMATOR} component={Animator} />
      </Switch>
    </>
  );
};

export default App;
