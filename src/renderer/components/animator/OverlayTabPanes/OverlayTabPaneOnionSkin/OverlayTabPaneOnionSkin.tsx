import { Table } from "@mantine/core";
import { OverlayTabPaneBase } from "../OverlayTabPaneBase/OverlayTabPaneBase";
import { UiSlider } from "../../../ui/UiSlider/UiSlider";
import { DEFAULT_ONION_SKIN_OPACITY } from "../../../../../common/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setEnableOnionSkin, setOnionSkinOpacity } from "../../../../redux/slices/projectSlice";

export const OverlayTabPaneOnionSkin = () => {
  const dispatch = useDispatch();
  const enableOnionSkin = useSelector((state: RootState) => state.project.enableOnionSkin);
  const onionSkinOpacity = useSelector((state: RootState) => state.project.onionSkinOpacity);

  const handleChangeEnable = (newValue: boolean) => dispatch(setEnableOnionSkin(newValue));
  const handleChangeOpacity = (newValue: number) => dispatch(setOnionSkinOpacity(newValue));

  return (
    <OverlayTabPaneBase
      title="Onion Skin"
      showReset={onionSkinOpacity !== DEFAULT_ONION_SKIN_OPACITY}
      onReset={() => handleChangeOpacity(DEFAULT_ONION_SKIN_OPACITY)}
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
    </OverlayTabPaneBase>
  );
};
