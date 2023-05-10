import { useDispatch, useSelector } from "react-redux";
import { changeWorkingDirectory } from "../../../../redux/thunks";
import { RootState } from "../../../../redux/store";
import Button from "../../../common/Button/Button";
import InputGroup from "../../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../../common/Input/InputLabel/InputLabel";
import "./ChooseWorkingDirectory.css";
import { ThunkDispatch, Action } from "@reduxjs/toolkit";

const ChooseWorkingDirectory = (): JSX.Element => {
  const { workingDirectory } = useSelector((state: RootState) => state.app.userPreferences);
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();

  return (
    <InputGroup row>
      <InputLabel inputId="chooseWorkingDirectoryButton">
        Projects working directory
        <br />
        <span className="choose-working-directory__name">
          {workingDirectory ?? "No directory selected"}
        </span>
      </InputLabel>

      <Button
        id="chooseWorkingDirectoryButton"
        title="Browse..."
        onClick={() => dispatch(changeWorkingDirectory(workingDirectory))}
      />
    </InputGroup>
  );
};

export default ChooseWorkingDirectory;
