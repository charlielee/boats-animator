import { Table } from "@mantine/core";
import { OverlayTabPaneBase } from "../OverlayTabPaneBase/OverlayTabPaneBase";
import { UiSlider } from "../../../ui/UiSlider/UiSlider";
import { DEFAULT_ONION_SKIN_OPACITY } from "../../../../../common/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setEnableOnionSkin, setOnionSkinOpacity } from "../../../../redux/slices/projectSlice";
import { UiNumberInput } from "../../../ui/UiNumberInput/UiNumberInput";
import { useState } from "react";

export const OverlayTabPaneOnionSkin = () => {
  const dispatch = useDispatch();

  const enableOnionSkin = useSelector((state: RootState) => state.project.enableOnionSkin);
  const handleChangeEnable = (newValue: boolean) => dispatch(setEnableOnionSkin(newValue));

  const onionSkinOpacity = useSelector((state: RootState) => state.project.onionSkinOpacity);
  const handleChangeOpacity = (newValue: number) => dispatch(setOnionSkinOpacity(newValue));

  const [onionSkinFramesVisible, setOnionSkinFramesVisible] = useState(1);

  const showReset = onionSkinOpacity !== DEFAULT_ONION_SKIN_OPACITY || onionSkinFramesVisible !== 1;
  const handleReset = () => {
    handleChangeOpacity(DEFAULT_ONION_SKIN_OPACITY);
    setOnionSkinFramesVisible(1);
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
      <Table.Tr>
        <Table.Td>Opacity</Table.Td>
        <Table.Td>
          <UiSlider
            value={onionSkinOpacity}
            min={0}
            max={100}
            step={1}
            onChange={handleChangeOpacity}
          />
        </Table.Td>
      </Table.Tr>

      <Table.Tr>
        <Table.Td>Number of Frames Visible</Table.Td>
        <Table.Td>
          <UiNumberInput
            value={onionSkinFramesVisible}
            min={1}
            max={8}
            step={1}
            onChange={setOnionSkinFramesVisible}
          />
        </Table.Td>
      </Table.Tr>
    </OverlayTabPaneBase>
  );
};
