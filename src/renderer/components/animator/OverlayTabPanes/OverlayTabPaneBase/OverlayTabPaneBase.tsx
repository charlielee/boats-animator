import { Box, Table } from "@mantine/core";
import { ReactNode } from "react";
import IconName from "../../../common/Icon/IconName";
import { SemanticColor } from "../../../ui/Theme/SemanticColor";
import { UiButton } from "../../../ui/UiButton/UiButton";
import "./OverlayTabPaneBase.css";

interface OverlayTabPaneBoxProps {
  title: string;
  showReset: boolean;
  onReset: () => void;
  children: ReactNode;
}

export const OverlayTabPaneBase = ({
  title,
  showReset,
  onReset,
  children,
}: OverlayTabPaneBoxProps) => (
  <Box className="overlay-tab-pane-base__box">
    <Table classNames={{ tr: "overlay-tab-pane-base__table-row" }}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th colSpan={2}>{title}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {children}

        <Table.Tr>
          <Table.Td colSpan={2} align="right">
            {showReset && (
              <UiButton
                inList
                icon={IconName.PLAY_LOOP}
                semanticColor={SemanticColor.PRIMARY}
                onClick={onReset}
              >
                Reset
              </UiButton>
            )}
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  </Box>
);
