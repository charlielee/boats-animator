import LogLevel from "../LogLevel";
import { UserPreferences } from "../UserPreferences";

namespace Ipc {
  export namespace AppVersion {
    export type Payload = undefined;
    export type Response = Promise<string>;
  }

  export namespace CheckCameraAccess {
    export type Payload = undefined;
    export type Response = Promise<boolean>;
  }

  export namespace GetUserPreferences {
    export type Payload = undefined;
    export type Response = Promise<UserPreferences>;
  }

  export namespace LogRenderer {
    export type Payload = {
      logLevel: LogLevel;
      loggingCode: string;
      message?:
        | string
        | number
        | boolean
        | undefined
        | Record<string, string | number | boolean | undefined>;
    };
    export type Response = Promise<void>;
  }

  export namespace OnCloseButtonClick {
    export type Payload = undefined;
    export type Response = Promise<void>;
  }

  export namespace SaveSettingsAndClose {
    export type Payload = { userPreferences: UserPreferences };
    export type Response = Promise<void>;
  }

  export namespace OpenUserDataDirectory {
    export type Payload = undefined;
    export type Response = Promise<void>;
  }

  export namespace OpenConfirmPrompt {
    export type Payload = { message: string };
    export type Response = Promise<boolean>;
  }

  export namespace OpenDirDialog {
    export type Payload = {
      workingDirectory: string | undefined;
      title: string;
    };
    export type Response = Promise<string | undefined>;
  }

  export namespace OpenExportVideoFilePathDialog {
    export type Payload = {
      currentFilePath: string | undefined;
    };
    export type Response = Promise<string | undefined>;
  }

  export namespace ExportVideoStart {
    export type Payload = {
      ffmpegArguments: string[];
      videoFilePath: string;
    };
    export type Response = Promise<{ code: number; videoFilePath: string }>;
  }

  export namespace OnExportVideoData {
    export type Payload = {
      data: string;
    };
    export type Response = Promise<void>;
  }

  export namespace ShowItemInFolder {
    export type Payload = {
      filePath: string;
    };
    export type Response = Promise<void>;
  }
}

export default Ipc;
