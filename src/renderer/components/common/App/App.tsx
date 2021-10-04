import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { MemoryRouter, Route } from "react-router-dom";
import Animator from "../../../pages/Animator/Animator";
import Launcher from "../../../pages/Launcher/Launcher";

const App = (): JSX.Element => {
  library.add(fas);

  return (
    <MemoryRouter>
      <Route exact path="/" component={Launcher} />
      <Route exact path="/animator" component={Animator} />
    </MemoryRouter>
  );
};

export default App;
