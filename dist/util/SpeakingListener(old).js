"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var SpeakingListener = /** @class */ (function (_super) {
    __extends(SpeakingListener, _super);
    function SpeakingListener(member) {
        var _this = _super.call(this) || this;
        _this.silenceLog = new Array();
        _this._member = member;
        _this._active = false;
        _this._lastTalk = -1;
        _this._startingTime = new Date().getTime();
        _this._isTalking = null;
        _this._member.client.on('guildMemberSpeaking', function (member, speaking) {
            if (!_this._active)
                return;
            if (speaking.bitfield) {
                _this.emit('talk');
                _this._isTalking = true;
                _this._insertSilence();
            }
            else {
                _this.emit('silence');
                _this._isTalking = false;
                _this._lastTalk = new Date().getTime();
            }
        });
        return _this;
    }
    SpeakingListener.prototype.isLestening = function () {
        return this._active;
    };
    SpeakingListener.prototype.listen = function () {
        this._active = true;
        this._startingTime = new Date().getTime();
        this._lastTalk = new Date().getTime();
    };
    SpeakingListener.prototype._insertSilence = function () {
        if (this._lastTalk != -1) {
            var currentTime = new Date().getTime();
            var silence = {
                start: this._lastTalk - this._startingTime,
                end: currentTime - this._startingTime
            };
            this.silenceLog.push(silence);
        }
    };
    SpeakingListener.prototype.stop = function () {
        this._active = false;
        if (!this._isTalking) {
            this._insertSilence();
        }
    };
    return SpeakingListener;
}(events_1.EventEmitter));
exports.default = SpeakingListener;
//# sourceMappingURL=SpeakingListener(old).js.map