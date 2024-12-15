import { Box, Stack } from "@mantine/core";
import { OnionSkinPane } from "./OnionSkinPane/OnionSkinPane";
import { PlaybackPane } from "./PlaybackPane/PlaybackPane";
import { PreviewToolbarPlayback } from "../PreviewToolbar/PreviewToolbarPlayback/PreviewToolbarPlayback";

export const LeftPanes = () => (
  <Stack justify="space-between">
    <Stack>
      <OnionSkinPane />
      <PlaybackPane />
    </Stack>

    <Box p="xs">
      <PreviewToolbarPlayback />
    </Box>
  </Stack>
);
