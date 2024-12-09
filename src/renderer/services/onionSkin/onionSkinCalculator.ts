import { Track } from "../../../common/project/Track";

export const calculateLiveViewOpacity = (
  enableOnionSkin: boolean,
  onionSkinOpacity: number,
  frameTrack: Track
): number => (enableOnionSkin && frameTrack.trackItems.length > 0 ? onionSkinOpacity : 1);

export const calculateOnionSkinFrameOpacity = (onionSkinOpacity: number, index: number): number =>
  index === 0 ? 1 : onionSkinOpacity;
