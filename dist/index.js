"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = __importStar(require("discord.js"));
var command_1 = __importDefault(require("./command"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var client = new Discord.Client();
client.login(process.env.BOT_TOKEN);
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
})
    .on('message', function (msg) {
    if (msg.author === client.user)
        return;
    if (msg.content.charAt(0) === process.env.PREFIX)
        command_1.default(msg);
})
    .on('error', function (err) {
    console.error(err);
});
//# sourceMappingURL=index.js.map