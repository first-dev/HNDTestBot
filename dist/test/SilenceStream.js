"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var fs_1 = __importDefault(require("fs"));
var count = 0;
var silenceReadStream = new stream_1.Readable({
    read: function (size) {
        console.log("reading " + size);
        if (count < 10)
            this.push(new Uint8Array(3840));
        else
            this.push(null);
        count++;
    }
});
var writeStream = fs_1.default.createWriteStream('./test/output')
    .on('finish', function () {
    console.log('finished');
});
silenceReadStream.pipe(writeStream);
//# sourceMappingURL=SilenceStream.js.map