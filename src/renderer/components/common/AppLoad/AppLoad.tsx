import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Icon from "../Icon/Icon";
import IconName from "../Icon/IconName";
import "./AppLoad.css";

const AppLoad = (): JSX.Element => {
  const { loadingMessage } = useSelector((state: RootState) => state.app);

  return (
    <div
      className={classNames("app-load", { "app-load--show": loadingMessage })}
    >
      <div className="app-load__content">
        <h2>{loadingMessage}</h2>
        <div className="app-load__dots">
          <Icon name={IconName.CIRCLE} className="app-load__dot" />
          <Icon name={IconName.CIRCLE} className="app-load__dot" />
          <Icon name={IconName.CIRCLE} className="app-load__dot" />
        </div>
      </div>
    </div>
  );
};

export default AppLoad;
