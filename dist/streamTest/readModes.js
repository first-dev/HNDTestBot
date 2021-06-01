"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var data = '';
var readerStream = fs_1.default.createReadStream('./streamTest/file.txt'); //Create a readable stream
readerStream.setEncoding('UTF8'); // Set the encoding to be utf8. 
// Handle stream events --> data, end, and error
readerStream.on('data', function (chunk) {
    console.log('chunck:', chunk);
    data += chunk;
});
readerStream.on('end', function () {
    //    console.log(data)
});
readerStream.on('error', function (err) {
    console.log(err.stack);
});
console.log("Program Ended");
//# sourceMappingURL=readModes.js.map