import { useDispatch, useSelector } from "react-redux";
import { setOverlayTab } from "../../../../redux/slices/projectSlice";
import { RootState } from "../../../../redux/store";
import IconName from "../../../common/Icon/IconName";
import { UiActionIcon, UiActionIconRole } from "../../../ui/UiActionIcon/UiActionIcon";

export const enum OverlayTab {
  PLAYBACK = "PLAYBACK",
  GRID = "GRID",
  ASPECT_RATIO = "ASPECT_RATIO",
  ONION_SKIN = "ONION_SKIN",
}

export const PreviewToolbarOverlayTabs = () => {
  const overlayTab = useSelector((state: RootState) => state.project.overlayTab);
  const dispatch = useDispatch();

  const handleSelectTab = (selectedTabName: OverlayTab) => {
    const newTabName = selectedTabName === overlayTab ? undefined : selectedTabName;
    dispatch(setOverlayTab(newTabName));
  };

  return (
    <>
      <UiActionIcon
        open={overlayTab === OverlayTab.PLAYBACK}
        icon={IconName.PLAYBACK_SETTINGS}
        onClick={() => handleSelectTab(OverlayTab.PLAYBACK)}
        role={UiActionIconRole.TOOLBAR_TAB}
      >
        Playback Settings
      </UiActionIcon>
      {/* <UiActionIcon
        open={overlayTab === OverlayTab.GRID}
        icon={IconName.GRID}
        onClick={() => handleSelectTab(OverlayTab.GRID)}
        role={UiActionIconRole.TOOLBAR_TAB}
      >
        Grid Overlay
      </UiActionIcon> */}
      {/* <UiActionIcon
        open={overlayTab === OverlayTab.ASPECT_RATIO}
        icon={IconName.ASPECT_RATIO}
        onClick={() => handleSelectTab(OverlayTab.ASPECT_RATIO)}
        role={UiActionIconRole.TOOLBAR_TAB}
      >
        Aspect Ratio Overlay
      </UiActionIcon> */}
      <UiActionIcon
        open={overlayTab === OverlayTab.ONION_SKIN}
        icon={IconName.ONION_SKIN}
        onClick={() => handleSelectTab(OverlayTab.ONION_SKIN)}
        role={UiActionIconRole.TOOLBAR_TAB}
      >
        Onion Skin
      </UiActionIcon>
    </>
  );
};
