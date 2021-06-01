import { Message } from 'discord.js'

export default (msg: Message) => {
    msg.channel.send(new Date().toDateString())
}