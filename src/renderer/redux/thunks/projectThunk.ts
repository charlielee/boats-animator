import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { Project } from "../../../common/project/Project";
import { db } from "../../services/database/Database";
import {
  RecentDirectoryEntry,
  RecentDirectoryType,
  getWorkingDirectory,
  putOrAddWorkingDirectory,
} from "../../services/database/RecentDirectoryEntry";
import {
  formatProjectName,
  makeProjectDirectory,
  makeTake,
} from "../../services/project/projectBuilder";
import { addProject, addTake, setRecentDirectoryId } from "../slices/projectSlice";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";

export const changeWorkingDirectory = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const workingDirectoryHandle = await window.showDirectoryPicker({
        id: "changeWorkingDirectory",
        mode: "readwrite",
        startIn: "documents",
      });
      const recentDirectoryEntry = await putOrAddWorkingDirectory(workingDirectoryHandle);
      dispatch(setRecentDirectoryId(recentDirectoryEntry.id));
    })();
  };
};

export const newProject = (project: Project) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const workingDirectory = await getWorkingDirectory();
      if (workingDirectory === undefined) {
        throw "Unable to create a new project without a working directory selected";
      }

      const projectDirectory = makeProjectDirectory(project);
      const projectDirectoryHandle =
        await workingDirectory.fileSystemDirectoryHandle.getDirectoryHandle(projectDirectory);

      const name = formatProjectName(project.name);
      const recentDirectoryEntry: RecentDirectoryEntry = {
        id: uuidv4(),
        type: RecentDirectoryType.PROJECT,
        friendlyName: name,
        fileSystemDirectoryHandle: projectDirectoryHandle,
      };
      await db.recentDirectories.add(recentDirectoryEntry);

      const formattedProject: Project = { ...project, name: name };
      dispatch(addProject(formattedProject));

      const take = makeTake({
        shotNumber: 1,
        takeNumber: 1,
        frameRate: 15,
      });
      dispatch(addTake(take));
      // Todo async behave not quite right
      // Todo review the hook related to useLiveQuery
    })();
  };
};
