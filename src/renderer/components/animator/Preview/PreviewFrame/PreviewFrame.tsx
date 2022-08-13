import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import "./PreviewFrame.css";

interface PreviewFrameProps {
  src: string | undefined;
  hidden: boolean;
}

const PreviewFrame = ({ src, hidden }: PreviewFrameProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const drawImage = () => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) {
      return;
    }

    context?.drawImage(imageRef.current, 0, 0);
  };

  useEffect(() => {
    if (src === undefined) {
      return;
    }

    imageRef.current.src = src;
    imageRef.current.addEventListener("load", drawImage);
    setImageWidth(imageRef.current.naturalWidth);
    setImageHeight(imageRef.current.naturalHeight);

    return () => imageRef.current.removeEventListener("load", drawImage);
  }, [src]);

  useEffect(() => {
    drawImage();
  }, [imageWidth, imageHeight]);

  return (
    <canvas
      className={classNames("preview-frame", {
        "preview-frame--hidden": hidden,
      })}
      ref={canvasRef}
      width={imageWidth}
      height={imageHeight}
    />
  );
};

export default PreviewFrame;
