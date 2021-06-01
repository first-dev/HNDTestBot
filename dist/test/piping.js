"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var readStream = fs_1.default.createReadStream('./test/user_audio.pcm');
var writeStream = fs_1.default.createWriteStream('./test/output.pcm');
readStream.pipe(writeStream);
//# sourceMappingURL=piping.js.map