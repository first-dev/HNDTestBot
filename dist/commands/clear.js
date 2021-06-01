"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (msg) {
    var newLinesString = '';
    var blank = '⠀';
    for (var i = 0; i < 40; i++) {
        newLinesString += '\n';
    }
    msg.channel.send(blank + newLinesString + blank);
});
//# sourceMappingURL=clear.js.map