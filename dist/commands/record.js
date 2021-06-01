"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = exports.isRecording = void 0;
var fs_1 = __importDefault(require("fs"));
var join_1 = __importDefault(require("./join"));
var convertToMp3_1 = __importDefault(require("../util/convertToMp3"));
var SilenceInsert_1 = __importDefault(require("../util/SilenceInsert"));
var _isRecording;
var isRecording = function () { return _isRecording; };
exports.isRecording = isRecording;
var stop = function () { return _isRecording = false; };
exports.stop = stop;
exports.default = (function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, audioPath, audioMp3Path, silenceLog, writeStream, lastTalk, chunksCount, isTalking, pushSilence, startRecord, endRecord;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (_isRecording) {
                    msg.channel.send('Already recording');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, join_1.default(msg)];
            case 1:
                connection = _a.sent();
                if (!connection)
                    return [2 /*return*/];
                audioPath = './records/user_audio.pcm';
                audioMp3Path = './records/user_audio.mp3';
                silenceLog = new Array();
                lastTalk = new Date().getTime();
                chunksCount = 0;
                isTalking = false;
                _isRecording = true;
                pushSilence = function () {
                    var silencePosition = 3840 * chunksCount;
                    var silenceDuration = new Date().getTime() - lastTalk;
                    var silenceLength = silenceDuration * 192;
                    silenceLog.push({
                        position: silencePosition,
                        length: silenceLength
                    });
                };
                startRecord = function () {
                    fs_1.default.unlinkSync(audioPath);
                    var startSteam = function () {
                        if (_isRecording) {
                            writeStream = fs_1.default.createWriteStream(audioPath, { flags: 'a' })
                                .on('finish', function () {
                            });
                            connection.receiver.createStream(msg.member, {
                                end: 'silence',
                                mode: 'pcm'
                            })
                                .on('data', function (chunk) {
                                if (!isTalking) { // just started talking after silence
                                    pushSilence();
                                    isTalking = true;
                                }
                                chunksCount++;
                            })
                                .on('end', function () {
                                isTalking = false;
                                lastTalk = new Date().getTime();
                                startSteam();
                            })
                                .pipe(writeStream);
                        }
                    };
                    startSteam();
                };
                endRecord = function () {
                    _isRecording = false;
                    pushSilence();
                    writeStream.close();
                    SilenceInsert_1.default(audioPath, silenceLog);
                    convertToMp3_1.default(audioPath, audioMp3Path);
                    msg.channel.send('Finished recording');
                };
                startRecord();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=record.js.map