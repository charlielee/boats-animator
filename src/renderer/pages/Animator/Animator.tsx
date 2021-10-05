import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Page from "../../components/common/Page/Page";

const Animator = (): JSX.Element => {
  return (
    <Page>
      <h1>
        Hello Boats Animator World!{" "}
        <FontAwesomeIcon icon="coffee"></FontAwesomeIcon>
      </h1>

      <p>Your current platform is {window.preload.platform}.</p>

      <Link to="/">Go to launcher</Link>
    </Page>
  );
};

export default Animator;
