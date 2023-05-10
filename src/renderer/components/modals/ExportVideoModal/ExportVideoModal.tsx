import { useState } from "react";
import useSelectorWithProjectAndTake from "../../../hooks/useSelectorWithProjectAndTake";
import ExportVideoModalOptions from "./ExportVideoModalOptions/ExportVideoModalOptions";
import ExportVideoModalRendering from "./ExportVideoModalRendering/ExportVideoModalRendering";

const ExportVideoModal = (): JSX.Element => {
  const { take } = useSelectorWithProjectAndTake();
  const [ffmpegArguments, setFFmpegArguments] = useState("");
  const [videoFilePath, setVideoFilePath] = useState("");

  if (ffmpegArguments === "") {
    return (
      <ExportVideoModalOptions
        onSubmit={setFFmpegArguments}
        onVideoFilePathChange={setVideoFilePath}
        take={take}
      />
    );
  } else {
    return (
      <ExportVideoModalRendering
        ffmpegArguments={ffmpegArguments}
        originalVideoFilePath={videoFilePath}
      />
    );
  }
};

export default ExportVideoModal;
