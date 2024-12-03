import { Box } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const OverlayTabsPane = () => {
  const overlayTab = useSelector((state: RootState) => state.project.overlayTab);

  return (
    <Box
      w="22rem"
      miw="22rem"
      p="md"
      style={{
        overflow: "auto",
        backgroundColor: "var(--mantine-color-default)",
      }}
    >
      {overlayTab}
    </Box>
  );
};
