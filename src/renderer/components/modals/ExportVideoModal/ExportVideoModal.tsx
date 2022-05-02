import { useState } from "react";
import { Take } from "../../../../common/Project";
import ExportVideoModalOptions from "./ExportVideoModalOptions/ExportVideoModalOptions";
import ExportVideoModalRendering from "./ExportVideoModalRendering/ExportVideoModalRendering";

interface ExportVideoModalProps {
  take: Take;
}

const ExportVideoModal = ({ take }: ExportVideoModalProps): JSX.Element => {
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
