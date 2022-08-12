import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import "./PreviewFrame.css";

interface PreviewFrameProps {
  src: string;
  hidden: boolean;
}

const PreviewFrame = ({ src, hidden }: PreviewFrameProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) {
      return;
    }

    const image = new Image();
    image.src = src;
    context?.drawImage(image, 0, 0);
    setDimensions({ width: image.naturalWidth, height: image.naturalHeight });
  }, [src]);

  return (
    <canvas
      className={classNames("preview-frame", {
        "preview-frame--hidden": hidden,
      })}
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default PreviewFrame;
