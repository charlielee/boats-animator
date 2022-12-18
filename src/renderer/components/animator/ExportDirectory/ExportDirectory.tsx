import { useDispatch, useSelector } from "react-redux";
import { changeWorkingDirectory } from "../../../redux/thunks";
import { RootState } from "../../../redux/store";
import Button from "../../common/Button/Button";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import "./ExportDirectory.css";
import { ThunkDispatch, Action } from "@reduxjs/toolkit";

const ExportDirectory = (): JSX.Element => {
  const { workingDirectory } = useSelector(
    (state: RootState) => state.app.userPreferences
  );
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();

  return (
    <InputGroup>
      <InputLabel inputId="exportDirectoryButton">
        Captured frames will be exported to:
        <br />
        <span className="export-directory__name">
          {workingDirectory ?? "No directory selected"}
        </span>
      </InputLabel>

      <Button
        id="exportDirectoryButton"
        title="Browse..."
        onClick={() => dispatch(changeWorkingDirectory(workingDirectory))}
      />
    </InputGroup>
  );
};

export default ExportDirectory;
