import { Box, Table } from "@mantine/core";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import { RootState } from "../../../redux/store";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import { ImagingDeviceSettingsTr } from "../ImagingDeviceSettings/ImagingDeviceSettingsTr/ImagingDeviceSettingsTr";
import "./CapturePane.css";

export const CapturePane = () => {
  const { deviceIdentifier, deviceStatus } = useContext(ImagingDeviceContext);
  const showCapturePane = useSelector((state: RootState) => state.project.showCapturePane);

  return (
    showCapturePane && (
      <Box className="capture-pane__box">
        <Table classNames={{ tr: "capture-pane__table-row" }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th colSpan={3}>Capture</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Source</Table.Td>
              <Table.Td colSpan={2}>
                <UiButton
                  semanticColor={SemanticColor.PRIMARY}
                  onClick={PageRoute.ANIMATOR_CAPTURE_SOURCE}
                >
                  {deviceIdentifier?.name ?? "Select Capture Source"}
                </UiButton>
              </Table.Td>
            </Table.Tr>
            {deviceStatus?.settings.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={3}>No settings available for this Capture Source.</Table.Td>
              </Table.Tr>
            )}
            {deviceStatus?.settings.map((setting) => (
              <ImagingDeviceSettingsTr key={setting.name} setting={setting} />
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    )
  );
};
