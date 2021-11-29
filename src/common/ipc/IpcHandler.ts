import { UserPreferences } from "../UserPreferences";

namespace Ipc {
  export namespace AppVersion {
    export type Channel = "APP_VERSION";
    export type Payload = undefined;
    export type Response = Promise<string>;
  }

  export namespace GetUserPreferences {
    export type Channel = "GET_USER_PREFERENCES";
    export type Payload = undefined;
    export type Response = Promise<UserPreferences>;
  }

  export namespace OnCloseButtonClick {
    export type Channel = "ON_CLOSE_BUTTON_CLICK";
    export type Payload = undefined;
    export type Response = Promise<void>;
  }

  export namespace SaveSettingsAndClose {
    export type Channel = "SAVE_SETTINGS_AND_CLOSE";
    export type Payload = { userPreferences: UserPreferences };
    export type Response = Promise<void>;
  }

  export namespace OpenConfirmPrompt {
    export type Channel = "OPEN_CONFIRM_PROMPT";
    export type Payload = { message: string };
    export type Response = Promise<boolean>;
  }

  export namespace OpenDirDialog {
    export type Channel = "OPEN_DIR_DIALOG";
    export type Payload = {
      workingDirectory: string | undefined;
      title: string;
    };
    export type Response = Promise<string | undefined>;
  }
}

export default Ipc;
