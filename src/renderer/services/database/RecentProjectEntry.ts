import { ProjectId } from "../../../common/Flavors";

export interface RecentProjectEntry {
  id: ProjectId;
  name: string;
  fileSystemDirectoryHandle: FileSystemDirectoryHandle;
}
