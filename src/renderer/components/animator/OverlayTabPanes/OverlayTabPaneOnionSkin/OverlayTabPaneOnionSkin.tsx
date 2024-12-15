import { Input } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  DEFAULT_ONION_SKIN_FRAMES_VISIBLE,
  DEFAULT_ONION_SKIN_OPACITY,
} from "../../../../../common/utils";
import {
  setEnableOnionSkin,
  setOnionSkinFramesVisible,
  setOnionSkinOpacity,
} from "../../../../redux/slices/projectSlice";
import { RootState } from "../../../../redux/store";
import { UiNumberInput } from "../../../ui/UiNumberInput/UiNumberInput";
import { UiPaneSection } from "../../../ui/UiPaneSection/UiPaneSection";
import { UiSlider } from "../../../ui/UiSlider/UiSlider";
import { OverlayTabPaneBase } from "../OverlayTabPaneBase/OverlayTabPaneBase";

export const OverlayTabPaneOnionSkin = () => {
  const dispatch = useDispatch();

  const enableOnionSkin = useSelector((state: RootState) => state.project.enableOnionSkin);
  const handleChangeEnable = (newValue: boolean) => dispatch(setEnableOnionSkin(newValue));

  const onionSkinOpacity = useSelector((state: RootState) => state.project.onionSkinOpacity);
  const handleChangeOpacity = (newValue: number) => dispatch(setOnionSkinOpacity(newValue));

  const onionSkinFramesVisible = useSelector(
    (state: RootState) => state.project.onionSkinFramesVisible
  );
  const handleChangeFramesVisible = (newValue: number) =>
    dispatch(setOnionSkinFramesVisible(newValue));

  const showReset =
    onionSkinOpacity !== DEFAULT_ONION_SKIN_OPACITY ||
    onionSkinFramesVisible !== DEFAULT_ONION_SKIN_FRAMES_VISIBLE;
  const handleReset = () => {
    handleChangeOpacity(DEFAULT_ONION_SKIN_OPACITY);
    handleChangeFramesVisible(DEFAULT_ONION_SKIN_FRAMES_VISIBLE);
  };

  return (
    <OverlayTabPaneBase
      title="Onion Skin"
      showReset={showReset}
      onReset={handleReset}
      showTitleToggle
      titleToggle={enableOnionSkin}
      onTitleToggle={handleChangeEnable}
    >
      <UiPaneSection>
        <Input.Wrapper label="Opacity">
          <UiSlider
            value={onionSkinOpacity}
            min={0}
            max={1}
            step={0.01}
            onChange={handleChangeOpacity}
          />
        </Input.Wrapper>
      </UiPaneSection>

      <UiPaneSection>
        <UiNumberInput
          label="Number of Frames Visible"
          value={onionSkinFramesVisible}
          min={1}
          max={8}
          step={1}
          onChange={handleChangeFramesVisible}
        />
      </UiPaneSection>
    </OverlayTabPaneBase>
  );
};
