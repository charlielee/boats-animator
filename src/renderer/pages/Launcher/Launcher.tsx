import { Link } from "react-router-dom";
import Page from "../../components/common/Page/Page";

const Launcher = (): JSX.Element => {
  return (
    <Page>
      <Link to="/animator">New Project</Link>
    </Page>
  );
};

export default Launcher;
