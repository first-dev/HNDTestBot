import * as Discord from "discord.js"

export default async (msg: Discord.Message): Promise<Discord.VoiceConnection> => {
    const userChannel = msg.member!.voice.channel
    let connection: Discord.VoiceConnection = null as any

    if (!userChannel) {
        msg.channel.send('You must to join a voice channel first')
        return connection
    }

    connection = await userChannel.join()
    return connection
}