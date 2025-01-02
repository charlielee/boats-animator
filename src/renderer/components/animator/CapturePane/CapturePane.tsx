import { Input } from "@mantine/core";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import { RootState } from "../../../redux/store";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import { UiPane } from "../../ui/UiPane/UiPane";
import { UiPaneSection } from "../../ui/UiPaneSection/UiPaneSection";
import { DeviceSettingSection } from "../DeviceSetting/DeviceSettingSection/DeviceSettingSection";
import "./CapturePane.css";

export const CapturePane = () => {
  const { deviceIdentifier, deviceStatus } = useContext(ImagingDeviceContext);
  const showCapturePane = useSelector((state: RootState) => state.project.showCapturePane);

  return (
    showCapturePane && (
      <UiPane title="Capture" showReset={false} onReset={() => undefined}>
        <UiPaneSection>
          <Input.Wrapper label="Source" className="capture-pane__source-input-wrapper">
            <UiButton
              semanticColor={SemanticColor.PRIMARY}
              onClick={PageRoute.ANIMATOR_CAPTURE_SOURCE}
            >
              {deviceIdentifier?.name ?? "Select Capture Source"}
            </UiButton>
          </Input.Wrapper>
        </UiPaneSection>

        {deviceStatus?.settings.length === 0 && (
          <UiPaneSection>No settings available for this Capture Source.</UiPaneSection>
        )}
        {deviceStatus?.settings.map((setting) => (
          <DeviceSettingSection key={setting.name} setting={setting} />
        ))}
      </UiPane>
    )
  );
};
