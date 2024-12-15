import { Box, Stack } from "@mantine/core";
import { OverlayTabPaneOnionSkin } from "./OverlayTabPaneOnionSkin/OverlayTabPaneOnionSkin";
import { OverlayTabPanePlayback } from "./OverlayTabPanePlayback/OverlayTabPanePlayback";
import { PreviewToolbarPlayback } from "../PreviewToolbar/PreviewToolbarPlayback/PreviewToolbarPlayback";

export const OverlayTabsPane = () => (
  <Stack justify="space-between">
    <Stack>
      <OverlayTabPaneOnionSkin />
      <OverlayTabPanePlayback />
    </Stack>

    <Box p="xs">
      <PreviewToolbarPlayback />
    </Box>
  </Stack>
);
