import { Message } from 'discord.js'

export default (msg: Message) => {
    const userId = '171352081200840705'
    msg.channel.send(`<@${userId}> is kinda gay`)
}