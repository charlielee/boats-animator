import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Animator = (): JSX.Element => {
  return (
    <>
      <h1>
        Hello Boats Animator World!{" "}
        <FontAwesomeIcon icon="coffee"></FontAwesomeIcon>
      </h1>

      <p>Your current platform is {window.preload.platform}.</p>

      <Link to="/">Go to launcher</Link>
    </>
  );
};

export default Animator;
