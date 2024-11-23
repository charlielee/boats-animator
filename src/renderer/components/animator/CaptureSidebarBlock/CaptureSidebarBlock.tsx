import { Stack } from "@mantine/core";
import { useContext } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import { ImagingDeviceSettingsTable } from "../ImagingDeviceSettingsTable/ImagingDeviceSettingsTable";

const CaptureSidebarBlock = () => {
  const { deviceIdentifier } = useContext(ImagingDeviceContext);

  return (
    <SidebarBlock title="Capture">
      <Stack>
        <UiButton semanticColor={SemanticColor.PRIMARY} onClick={PageRoute.ANIMATOR_CAPTURE_SOURCE}>
          {deviceIdentifier?.name ?? "Select Capture Source"}
        </UiButton>

        <ImagingDeviceSettingsTable />
      </Stack>
    </SidebarBlock>
  );
};

export default CaptureSidebarBlock;
