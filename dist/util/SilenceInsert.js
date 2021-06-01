"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
exports.default = (function (filePath, silenceLog) {
    var rawRecord = fs_1.default.readFileSync(filePath);
    var outputChunks = [];
    silenceLog.forEach(function (element, index, array) {
        var audioStart = element.position;
        var audioEnd;
        if (index + 1 < array.length)
            audioEnd = array[index + 1].position;
        else
            audioEnd = rawRecord.length;
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
    fs_1.default.writeFileSync(filePath, outputBuffer);
});
//# sourceMappingURL=SilenceInsert.js.map