import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import Animator from "../../../pages/Animator/Animator";
import Launcher from "../../../pages/Launcher/Launcher";
import { loadPreferences } from "../../../services/userPreferences/UserPreferencesApi";
import AppLoad from "../AppLoad/AppLoad";
import AppUnloader from "../AppUnloader/AppUnloader";

const App = (): JSX.Element => {
  useEffect(() => {
    loadPreferences(dispatch);
  }, []);

  return (
    <>
      <AppLoad />
      <AppUnloader />

      <Switch>
        <Route exact path={PageRoute.LAUNCHER} component={Launcher} />
        <Route exact path={PageRoute.ANIMATOR} component={Animator} />
      </Switch>
    </>
  );
};

export default App;
function dispatch(dispatch: any) {
  throw new Error("Function not implemented.");
}
