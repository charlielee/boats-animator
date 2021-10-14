import { Link } from "react-router-dom";
import Content from "../../components/common/Content/Content";
import ContentBlock from "../../components/common/ContentBlock/ContentBlock";
import Page from "../../components/common/Page/Page";
import PageBody from "../../components/common/PageBody/PageBody";
import PageFooter from "../../components/common/PageFooter/PageFooter";
import PageFooterItem from "../../components/common/PageFooterItem/PageFooterItem";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import SidebarBlock from "../../components/common/SidebarBlock/SidebarBlock";

const Launcher = (): JSX.Element => (
  <Page>
    <PageBody>
      <Content>
        <ContentBlock>
          <h2>Welcome!</h2>
          <Link to="/animator">New Project</Link>
        </ContentBlock>
      </Content>

      <Sidebar>
        <SidebarBlock title="News" titleIcon="newspaper">
          <p>Hello!</p>
        </SidebarBlock>
      </Sidebar>
    </PageBody>

    <PageFooter>
      <PageFooterItem value="Frame 1 of 1" />
      <PageFooterItem value="Charlie Lee" />
    </PageFooter>
  </Page>
);

export default Launcher;
