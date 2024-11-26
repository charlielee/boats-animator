import { Box, Stack, Title, useMantineTheme } from "@mantine/core";
import { useContext } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { ThemeWithOther } from "../../ui/Theme/Theme";
import { UiButton } from "../../ui/UiButton/UiButton";
import { ImagingDeviceSettingsTable } from "../ImagingDeviceSettingsTable/ImagingDeviceSettingsTable";

export const CapturePane = () => {
  const { deviceIdentifier } = useContext(ImagingDeviceContext);
  const theme: ThemeWithOther = useMantineTheme();

  return (
    <Box w="22rem" p="md" style={{ borderLeft: theme.other.border }}>
      <Stack>
        <Title order={4} size="h5" style={{ textTransform: "uppercase" }}>
          Capture
        </Title>
        <UiButton semanticColor={SemanticColor.PRIMARY} onClick={PageRoute.ANIMATOR_CAPTURE_SOURCE}>
          {deviceIdentifier?.name ?? "Select Capture Source"}
        </UiButton>

        <ImagingDeviceSettingsTable />
      </Stack>
    </Box>
  );
};
