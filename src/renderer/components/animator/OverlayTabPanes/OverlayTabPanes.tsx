import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { OverlayTab } from "../PreviewToolbar/PreviewToolbarOverlayTabs/PreviewToolbarOverlayTabs";
import { OverlayTabPanePlayback } from "./OverlayTabPanePlayback/OverlayTabPanePlayback";
import { OverlayTabPaneOnionSkin } from "./OverlayTabPaneOnionSkin/OverlayTabPaneOnionSkin";

export const OverlayTabsPane = () => {
  const overlayTab = useSelector((state: RootState) => state.project.overlayTab);

  switch (overlayTab) {
    case OverlayTab.PLAYBACK:
      return <OverlayTabPanePlayback />;
    case OverlayTab.ONION_SKIN:
      return <OverlayTabPaneOnionSkin />;
  }
};
