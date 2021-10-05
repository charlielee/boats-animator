import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { APP_WINDOW_CHANGE_PAGE } from "../../../../common/IpcChannelNames";
import Animator from "../../../pages/Animator/Animator";
import Launcher from "../../../pages/Launcher/Launcher";

const App = (): JSX.Element => {
  library.add(fas);

  // Tell the main process when the app changes page
  const location = useLocation();
  useEffect(() => {
    window.preload.ipc[APP_WINDOW_CHANGE_PAGE](location.pathname);
  }, [location]);

  return (
    <Switch>
      <Route exact path="/" component={Launcher} />
      <Route exact path="/animator" component={Animator} />
    </Switch>
  );
};

export default App;
