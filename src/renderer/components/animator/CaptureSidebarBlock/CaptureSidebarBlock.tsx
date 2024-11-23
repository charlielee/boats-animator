import { Stack } from "@mantine/core";
import { useContext } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import { ImagingDeviceSettingsBlock } from "../ImagingDeviceSettingsBlock/ImagingDeviceSettingsBlock";

const CaptureSidebarBlock = () => {
  const { deviceIdentifier } = useContext(ImagingDeviceContext);

  return (
    <SidebarBlock title="Capture">
      <Stack>
        <UiButton semanticColor={SemanticColor.PRIMARY} onClick={PageRoute.ANIMATOR_CAPTURE_SOURCE}>
          {deviceIdentifier?.name ?? "Select Capture Source"}
        </UiButton>

        <ImagingDeviceSettingsBlock />
      </Stack>
    </SidebarBlock>
  );
};

export default CaptureSidebarBlock;
