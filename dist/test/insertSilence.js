"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var audioPath = './test/user_audio.pcm';
var silenceLog = new Array();
silenceLog.push({
    position: 0,
    length: 0
});
silenceLog.push({
    position: 2000 * 192,
    length: 1000 * 192
});
silenceLog.push({
    position: 5000 * 192,
    length: 0 * 192
});
// add silence to the audio file
var rawRecord = fs_1.default.readFileSync(audioPath);
var outputChunks = [];
silenceLog.forEach(function (element, index, array) {
    if (index + 1 === array.length)
        return;
    var audioStart = (element.position + element.length);
    var audioEnd = array[index + 1].position;
    var silenceChunk = new Uint8Array(element.length);
    var audioChunk = rawRecord.slice(audioStart, audioEnd);
    outputChunks.push(silenceChunk);
    outputChunks.push(audioChunk);
});
var totalLength = 0;
outputChunks.forEach(function (element) {
    totalLength += element.length;
});
var outputBuffer = new Uint8Array(totalLength);
var currentIndex = 0;
outputChunks.forEach(function (element) {
    outputBuffer.set(element, currentIndex);
    currentIndex += element.length;
});
fs_1.default.writeFileSync('./records/user_audio_processed.pcm', outputBuffer);
//# sourceMappingURL=insertSilence.js.map