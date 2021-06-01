import fs from 'fs'
import * as Discord from "discord.js"
import join from './join'

export default async (msg: Discord.Message) => {
    const msgTokens = msg.content.split(' ')
    const audioName = msgTokens.slice(1).join(' ')
    const path = `sounds/${audioName}.mp3`

    if (!fs.existsSync(path)) {
        msg.channel.send(`${audioName} was not found`)
        return
    }

    const connection = await join(msg)

    if (!connection) return

    connection.play(path)
    .on('error',  (error: any) => {
        console.log(error.code)
    })
}