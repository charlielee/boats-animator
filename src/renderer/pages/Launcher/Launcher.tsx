import { Link } from "react-router-dom";
import Content from "../../components/common/Content/Content";
import Page from "../../components/common/Page/Page";
import PageBody from "../../components/common/PageBody/PageBody";
import PageFooter from "../../components/common/PageFooter/PageFooter";
import PageFooterItem from "../../components/common/PageFooterItem/PageFooterItem";
import Sidebar from "../../components/common/Sidebar/Sidebar";

const Launcher = (): JSX.Element => (
  <Page>
    <PageBody>
      <Content>
        <Link to="/animator">New Project</Link>
      </Content>

      <Sidebar>
        <h2>Sidebar</h2>
      </Sidebar>
    </PageBody>

    <PageFooter>
      <PageFooterItem value="Frame 1 of 1" />
      <PageFooterItem value="Charlie Lee" />
    </PageFooter>
  </Page>
);

export default Launcher;
