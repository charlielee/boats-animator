//let args = {};
let args = "-framerate 15 -start_number 0 -i frame_%04d.png -c:v libx264 -preset ultrafast -crf 0 -vf format=yuv420p output.mp4"

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const spawn = require('child_process').spawn;
const ffmpeg = spawn(ffmpegPath, args);
ffmpeg.on('exit', function(e) {
	console.log(e);
});