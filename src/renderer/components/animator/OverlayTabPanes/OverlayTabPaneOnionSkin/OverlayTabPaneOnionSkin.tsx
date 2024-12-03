import { Table } from "@mantine/core";
import { OverlayTabPaneBase } from "../OverlayTabPaneBase/OverlayTabPaneBase";
import { UiSlider } from "../../../ui/UiSlider/UiSlider";
import { useState } from "react";

const DEFAULT_ONION_SKIN_OPACITY = 50;

export const OverlayTabPaneOnionSkin = () => {
  const [active, setActive] = useState(false);
  const [opacity, setOpacity] = useState(DEFAULT_ONION_SKIN_OPACITY);

  return (
    <OverlayTabPaneBase
      title="Onion Skin"
      showReset={opacity !== DEFAULT_ONION_SKIN_OPACITY}
      onReset={() => setOpacity(DEFAULT_ONION_SKIN_OPACITY)}
      showTitleToggle
      titleToggle={active}
      onTitleToggle={setActive}
    >
      <Table.Tr>
        <Table.Td>Opacity</Table.Td>
        <Table.Td>
          <UiSlider value={opacity} min={0} max={100} step={1} onChange={setOpacity} />
        </Table.Td>
      </Table.Tr>
    </OverlayTabPaneBase>
  );
};
