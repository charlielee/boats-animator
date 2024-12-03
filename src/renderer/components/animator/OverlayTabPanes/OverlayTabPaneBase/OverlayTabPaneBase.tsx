import { Box, Table } from "@mantine/core";
import { ReactNode } from "react";
import IconName from "../../../common/Icon/IconName";
import { SemanticColor } from "../../../ui/Theme/SemanticColor";
import { UiButton } from "../../../ui/UiButton/UiButton";

interface OverlayTabPaneBoxProps {
  title: string;
  active: boolean;
  onReset: () => void;
  children: ReactNode;
}

export const OverlayTabPaneBase = ({
  title,
  active,
  onReset,
  children,
}: OverlayTabPaneBoxProps) => (
  <Box
    w="22rem"
    miw="22rem"
    py="md"
    style={{
      overflow: "auto",
      backgroundColor: "var(--mantine-color-default)",
    }}
  >
    <Table classNames={{ tr: "playback-settings__table-row" }}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th colSpan={2}>{title}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {children}

        {active && (
          <Table.Tr>
            <Table.Td colSpan={2} align="right">
              <UiButton
                inList
                icon={IconName.PLAY_LOOP}
                semanticColor={SemanticColor.PRIMARY}
                onClick={onReset}
              >
                Reset
              </UiButton>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  </Box>
);
