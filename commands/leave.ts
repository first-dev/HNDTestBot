import * as Discord from "discord.js"

export default async (msg: Discord.Message) => {
    const botChannel = msg.guild?.voice?.channel

    if (!botChannel) {
        msg.channel.send('I\'m not on any voice channel')
        return
    }

    botChannel.leave()
}