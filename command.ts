import { Message } from 'discord.js'

export default (msg: Message) => {
    const command = msg.content.split(' ')[0].substr(1)
    try {
        require(`./commands/${command}`).default(msg)
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            msg.channel.send(`${process.env.PREFIX}${command} is not a valid command !`)
        } else {
            console.error(error)
        }
    }
}