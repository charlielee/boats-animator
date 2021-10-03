import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = (): JSX.Element => {
  library.add(fas);

  return (
    <>
      <h1>
        Hello Boats Animator World!{" "}
        <FontAwesomeIcon icon="coffee"></FontAwesomeIcon>
      </h1>

      <p>Your current platform is {window.preload.platform}.</p>
    </>
  );
};

export default App;
