import fs from 'fs'
import { Message } from 'discord.js'
import join from './join'

export default async (msg: Message) => {
    const path = './records/user_audio.pcm'

    if (!fs.existsSync(path)) {
        msg.channel.send('No record was found')
        return
    }

    const connection = await join(msg)
    if (connection) {
        const readStream = fs.createReadStream(path)
        
        connection.play(readStream, { type: 'converted' })
        .on('start', () => {
            console.log('playing!')
        })
        .on('finish', () => {
            console.log('finished playing!')
        })
        .on('error',  (err: any) => {
            console.log(err.code)
        })
	}
}