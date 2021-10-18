import { Link } from "react-router-dom";
import Content from "../../components/common/Content/Content";
import ContentBlock from "../../components/common/ContentBlock/ContentBlock";
import IconName from "../../components/common/Icon/IconName";
import Page from "../../components/common/Page/Page";
import PageBody from "../../components/common/PageBody/PageBody";
import PageFooter from "../../components/common/PageFooter/PageFooter";
import PageFooterItem from "../../components/common/PageFooterItem/PageFooterItem";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import SidebarBlock from "../../components/common/SidebarBlock/SidebarBlock";

const Animator = (): JSX.Element => {
  return (
    <Page>
      <PageBody>
        <Content>
          <ContentBlock>
            <h1>Hello Boats Animator World!</h1>

            <p>Your current platform is {window.preload.platform}.</p>

            <Link to="/">Go to launcher</Link>
          </ContentBlock>
        </Content>

        <Sidebar>
          <SidebarBlock title="Capture" titleIcon={IconName.CAPTURE}>
            Capture
          </SidebarBlock>

          <SidebarBlock title="Auto-Capture" titleIcon={IconName.CAPTURE_AUTO}>
            Auto-Capture
          </SidebarBlock>

          <SidebarBlock title="Guides" titleIcon={IconName.GUIDES}>
            Guides
          </SidebarBlock>

          <SidebarBlock title="Export" titleIcon={IconName.EXPORT}>
            Export
          </SidebarBlock>
        </Sidebar>
      </PageBody>

      <PageFooter>
        <PageFooterItem value={"Frame 1 of 0"}></PageFooterItem>
        <PageFooterItem value={"15 FPS"}></PageFooterItem>
        <PageFooterItem value={"No camera selected"}></PageFooterItem>
        <PageFooterItem value={"Capture mode"}></PageFooterItem>
      </PageFooter>
    </Page>
  );
};

export default Animator;
