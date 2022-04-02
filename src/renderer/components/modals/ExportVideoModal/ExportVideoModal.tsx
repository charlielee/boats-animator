import { useState } from "react";
import ExportVideoModalOptions from "./ExportVideoModalOptions/ExportVideoModalOptions";
import ExportVideoModalRendering from "./ExportVideoModalRendering/ExportVideoModalRendering";

const ExportVideoModal = (): JSX.Element => {
  const [ffmpegArguments, setFFmpegArguments] = useState("");

  if (ffmpegArguments === "") {
    return <ExportVideoModalOptions onSubmit={setFFmpegArguments} />;
  } else {
    return <ExportVideoModalRendering ffmpegArguments={ffmpegArguments} />;
  }
};

export default ExportVideoModal;
