import "./LeftPanes.css";
import { OnionSkinPane } from "./OnionSkinPane/OnionSkinPane";
import { PlaybackPane } from "./PlaybackPane/PlaybackPane";

export const LeftPanes = () => (
  <div className="left-panes">
    <OnionSkinPane />
    <PlaybackPane />
  </div>
);
