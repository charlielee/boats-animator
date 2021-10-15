import { useHistory } from "react-router-dom";
import { PageRoute } from "../../../common/PageRoute";

export const navigateTo = (page: PageRoute) => {
  const history = useHistory();
  history.push(page);
};
