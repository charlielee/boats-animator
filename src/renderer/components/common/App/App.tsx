import { Redirect, Route } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import Animator from "../../animator/Animator/Animator";
import PreferencesModal from "../../modals/PreferencesModal/PreferencesModal";
import StartupModal from "../../modals/StartupModal/StartupModal";
import AppListener from "../AppListener/AppListener";
import AppLoad from "../AppLoad/AppLoad";

const App = (): JSX.Element => {
  return (
    <>
      <AppListener />
      <AppLoad />

      <Route exact path="/">
        <Redirect to={PageRoute.STARTUP_MODAL} />
      </Route>

      <Route
        exact
        path={PageRoute.PREFERENCES_MODAL}
        component={PreferencesModal}
      />
      <Route exact path={PageRoute.STARTUP_MODAL} component={StartupModal} />

      <Route path={PageRoute.ANIMATOR} component={Animator} />
    </>
  );
};

export default App;
