import { useState } from "react";
import ExportVideoModalOptions from "./ExportVideoModalOptions/ExportVideoModalOptions";
import ExportVideoModalRendering from "./ExportVideoModalRendering/ExportVideoModalRendering";

const ExportVideoModal = (): JSX.Element => {
  const [ffmpegArguments, setFFmpegArguments] = useState("");
  const [videoFilePath, setVideoFilePath] = useState("");

  if (ffmpegArguments === "") {
    return (
      <ExportVideoModalOptions
        onSubmit={setFFmpegArguments}
        onVideoFilePathChange={setVideoFilePath}
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
