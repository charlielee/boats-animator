import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Take, TrackItem } from "../../../common/Project";
import { RootState } from "../../redux/store";
import PlaybackContext, { PlaybackContextProps } from "./PlaybackContext";

interface PlaybackContextProviderProps {
  take: Take;
  children: ReactNode;
}

const FIFTEEN_FPS_MICRO_SECS = 66670;

const PlaybackContextProvider = ({
  take,
  children,
}: PlaybackContextProviderProps) => {
  // const [timestamp, setTimestamp] = useState(0);

  const trackItems = take.frameTrack.trackItems;
  const { fileRefs } = useSelector((state: RootState) => ({
    // trackItems: state.project.take?.frameTrack.trackItems,
    fileRefs: state.project.fileRefs,
  }));

  const createVideoFrame = async (trackItem: TrackItem, timestamp: number) => {
    const fileRef = fileRefs.find(
      (fileRef) => fileRef.trackItemId === trackItem.id
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await fetch(fileRef!.location);
    const blob = await response.blob();
    const bit = await createImageBitmap(blob);

    return new VideoFrame(bit, {
      duration: FIFTEEN_FPS_MICRO_SECS * trackItem.length,
      timestamp,
    });
    // console.log(trackItem.id, frame.timestamp);

    // setTimestamp(
    //   (prevTimestamp) =>
    //     prevTimestamp + trackItem.length * FIFTEEN_FPS_MICRO_SECS
    // );
  };

  useEffect(() => {
    (async () => {
      const mstg = new MediaStreamTrackGenerator({ kind: "video" });
      const writer = mstg.writable.getWriter();
      const videoFrames: VideoFrame[] = [];

      let timestamp = 0;
      trackItems.forEach(async (trackItem) => {
        const frame = await createVideoFrame(trackItem, timestamp);
        videoFrames.push(frame);
        timestamp += trackItem.length * FIFTEEN_FPS_MICRO_SECS;
        writer.write(frame);
      });
      // console.log(videoFrames);

      // new TransformStream(({async transform(videoFrame, controller) {
      //   controller.enqueue(videoFrames[0])
      // }
      // }))

      // https://stackoverflow.com/questions/70313774/webcodecs-videoencoder-create-video-from-encoded-frames
    })();
  }, [trackItems]);

  const value: PlaybackContextProps = {
    videoFrames: [],
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackContextProvider;

// console.log()

// const blobs = trackItems.map(
//   (trackItem) =>
//     fileRefs.find((f) => f.trackItemId === trackItem.id)?.location ?? ""
// );

// console.log(
//   blobs.map((url) => {
//     return new VideoFrame((new HTMLVideoElement().srcObject = blob));
//   })
// );
