import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { loadPreferences } from "../../../services/userPreferences/UserPreferencesApi";
import Animator from "../../animator/Animator/Animator";
import StartupModal from "../../modals/StartupModal/StartupModal";
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

      <Route exact path="/">
        <Redirect to={PageRoute.STARTUP_MODAL} />
      </Route>

      <Route exact path={PageRoute.STARTUP_MODAL} component={StartupModal} />
      <Route path={PageRoute.ANIMATOR} component={Animator} />
    </>
  );
};

export default App;
