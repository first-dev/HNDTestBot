import { Message } from 'discord.js'

export default (msg: Message) => {
    msg.channel.send(`Server name: ${msg.guild!.name}\nMember count: ${msg.guild!.memberCount}`)
}