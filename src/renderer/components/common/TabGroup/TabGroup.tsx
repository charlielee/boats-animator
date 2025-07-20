import classNames from "classnames";
import { ReactNode, useState } from "react";
import "./TabGroup.css";

interface TabGroupProps {
  titles: string[];
  tabs: ReactNode[];
}

const TabGroup = ({ titles, tabs }: TabGroupProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tab-group">
      <div className="tab-group__nav">
        {titles.map((title, index) => (
          <a
            href="#"
            className={classNames("tab-group__nav-item", {
              "tab-group__nav-item--active": activeIndex === index,
            })}
            onClick={() => setActiveIndex(index)}
            key={title}
          >
            <div className="tab-group__nav-item-text">{title}</div>
          </a>
        ))}
      </div>

      <div className="tab-group__panes">
        {tabs.map((tab, index) => (
          <div
            className={classNames("tab-group__pane-item", {
              "tab-group__pane-item--active": activeIndex === index,
            })}
            key={index}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabGroup;
