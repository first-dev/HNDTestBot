"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
exports.default = (function (input, output) {
    ffmpeg(input)
        .inputOptions([
        '-f s16le',
        '-ar 48000',
        '-ac 2',
        '-c pcm_s16le'
    ])
        .output(output)
        .on('error', function (err) {
        console.log('conversion failed\n', err);
    })
        .run();
});
//# sourceMappingURL=convertToMp3.js.map