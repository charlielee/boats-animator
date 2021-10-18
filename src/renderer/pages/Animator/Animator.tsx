import { Link } from "react-router-dom";
import Content from "../../components/common/Content/Content";
import ContentBlock from "../../components/common/ContentBlock/ContentBlock";
import Page from "../../components/common/Page/Page";
import PageBody from "../../components/common/PageBody/PageBody";

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
      </PageBody>
    </Page>
  );
};

export default Animator;
