import { session } from "electron";
import fastGlob from "fast-glob";
import logger from "../logger/Logger";

export const REACT_DEV_TOOLS_ID = "fmkadmapgofadopljbjfkapdkoienihi";
export const REDUX_DEV_TOOLS_ID = "lmhkpmbekcpmknklioeibfkpmmfibljd";

const WINDOWS_DIR = `${process.env.LOCALAPPDATA}\\Google\\Chrome\\User Data\\Default\\Extensions`;
const MAC_DIR = "~/Library/Application Support/Google/Chrome/Default/Extensions";
const LINUX_DIR = "~/.config/google-chrome/Default/Extensions";

const getExtensionDirectory = () => {
  switch (process.platform) {
    case "win32":
      // fast-glob requires forward slashes in expressions
      return WINDOWS_DIR.replace(/\\/g, "/");
    case "darwin":
      return MAC_DIR;
    case "linux":
      return LINUX_DIR;
    default:
      return "";
  }
};

export const loadExtension = async (id: string) => {
  const location = await fastGlob(`${getExtensionDirectory()}/${id}/*`, {
    onlyDirectories: true,
  });

  if (location.length < 1) {
    logger.info("devTools.loadExtension.notFound", id);
    return;
  }

  await session.defaultSession.loadExtension(location[0]);
  logger.info("devTools.loadExtension.success", id);
};
