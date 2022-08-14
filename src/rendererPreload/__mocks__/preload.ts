import * as path from "path";

export const api = {
  joinPath: (...paths: string[]) => path.join(...paths),
};
