import { Route, Switch } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import Animator from "../../../pages/Animator/Animator";
import Launcher from "../../../pages/Launcher/Launcher";
import AppUnloader from "../AppUnloader/AppUnloader";

const App = (): JSX.Element => {
  return (
    <>
      <AppUnloader />

      <Switch>
        <Route exact path={PageRoute.LAUNCHER} component={Launcher} />
        <Route exact path={PageRoute.ANIMATOR} component={Animator} />
      </Switch>
    </>
  );
};

export default App;
