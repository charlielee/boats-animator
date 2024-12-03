import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { OverlayTab } from "../PreviewToolbar/PreviewToolbarOverlayTabs/PreviewToolbarOverlayTabs";
import { OverlayTabPanePlayback } from "./OverlayTabPanePlayback/OverlayTabPanePlayback";

export const OverlayTabsPane = () => {
  const overlayTab = useSelector((state: RootState) => state.project.overlayTab);

  switch (overlayTab) {
    case OverlayTab.PLAYBACK:
      return <OverlayTabPanePlayback />;
  }
};
