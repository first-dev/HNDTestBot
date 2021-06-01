import * as Discord from "discord.js"
import { Message } from 'discord.js'
import commandHandler from './command'
import dotenv from 'dotenv'
dotenv.config()

declare global {
    namespace NodeJS {
        interface Global {
            isRecording: boolean,
        } 
    }
}

const client = new Discord.Client()
client.login(process.env.BOT_TOKEN)
client.on('ready', () => {
    console.log(`Logged in as ${client.user!.tag}!`)
})
.on('message', (msg: Message) => {
    if (msg.author === client.user) return
    if (msg.content.charAt(0) === process.env.PREFIX) commandHandler(msg)
})
.on('error', (err: Error) => {
    console.error(err)
})

global.isRecording = false