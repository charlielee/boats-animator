import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import { RootState } from "../../../redux/store";

const CaptureSidebarBlock = () => {
  const { deviceStatus } = useSelector((state: RootState) => ({
    deviceStatus: state.capture.deviceStatus,
  }));

  return (
    <SidebarBlock title="Capture">
      <InputGroup>
        <InputLabel inputId="camera-source-select">Capture Source</InputLabel>
        <UiButton semanticColor={SemanticColor.PRIMARY} onClick={PageRoute.ANIMATOR_CAPTURE_SOURCE}>
          {deviceStatus?.identifier?.name ?? "Select Capture Source"}
        </UiButton>
      </InputGroup>
    </SidebarBlock>
  );
};

export default CaptureSidebarBlock;
