import fs from 'fs'
import { Message } from "discord.js"
import { GuildMember } from "discord.js"
import join from './join'
import SpeakingListener from '../util/SpeakingListener'

export default async (msg: Message) => {
    const connection = await join(msg)

    if (!connection) return

    new SpeakingListener(msg.member!)
    .on('talk', () => {
        console.log('talk')
    })
    .on('silence', () => {
        console.log('silence')
    })
}