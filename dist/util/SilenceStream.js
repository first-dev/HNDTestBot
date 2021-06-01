"use strict";
// 1 chunk = Uint8Array(3840) = 20ms
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var SilenceStream = /** @class */ (function () {
    function SilenceStream() {
        this._chunk = new Uint8Array(3840);
        this._isReading = false;
        var silenceStream = this;
        this._stream = new stream_1.Readable({
            read: function () {
                var _this = this;
                if (!silenceStream._isReading) {
                    setTimeout(function () {
                        silenceStream._isReading = false;
                        _this.push(silenceStream._chunk);
                        console.log('chunk pushed');
                    }, 20);
                    silenceStream._isReading = true;
                }
            }
        });
    }
    Object.defineProperty(SilenceStream.prototype, "stream", {
        get: function () {
            return this._stream;
        },
        enumerable: false,
        configurable: true
    });
    SilenceStream.prototype.end = function () {
        this._chunk = null;
    };
    return SilenceStream;
}());
exports.default = SilenceStream;
//# sourceMappingURL=SilenceStream.js.map