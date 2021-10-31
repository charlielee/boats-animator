import { useDispatch, useSelector } from "react-redux";
import { editSettings } from "../../../redux/bundles/settings";
import { RootState } from "../../../redux/store";
import Button from "../../common/Button/Button";

const ExportDirectory = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const updateFrameDir = () =>
    dispatch(
      editSettings({
        ...settings,
        exportFrameDir: Math.random().toString(),
      })
    );

  return (
    <div>
      <p>Frames will be exported to: {settings.exportFrameDir}</p>

      <Button title={"Click me"} onClick={() => updateFrameDir()} />
    </div>
  );
};

export default ExportDirectory;
