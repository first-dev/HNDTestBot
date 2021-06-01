import { Message } from 'discord.js'

export default (msg: Message) => {
    let newLinesString = ''
    const blank = '⠀'
    for (let i = 0; i < 40; i++) {
        newLinesString+='\n'
    }
    msg.channel.send(blank+newLinesString+blank)
}