import fs from 'fs'
import { Message } from 'discord.js'
const converter = require('../util/convertToMp3')
const join = require('./join')

export default async (msg: Message) => {
    const audioPath = './records/user_audio.pcm'
    const audioMp3Path = './records/user_audio.mp3'
    const connection = await join(msg)
    if (connection) {
        const writeStream = fs.createWriteStream(audioPath)
        let lastDate = new Date();
        const getTimePassed = () => {
            const result = new Date().getTime()-lastDate.getTime()
            lastDate = new Date()
            return result
        }
        const readStream = connection.receiver.createStream(msg.member, {
            end: 'manual',
            mode: 'pcm'
        })
        .on('data', (chunk: any) => {
            // console.log(`Received ${chunk.length} bytes, at ${getTimePassed()}`)
            // if(getTimePassed()>100) console.log('silence')
        })
        .on('end', () => {
            console.log('There will be no more data.')
        })
        .pipe(writeStream)
        .on('finish', () => {
            converter(audioPath, audioMp3Path)
            msg.channel.send('Finished recording')
        })
        
        setTimeout(() => {
            readStream.end()
            console.log("ending readStream")
        }, 10000)
        msg.author.client.on('voiceStateUpdate', (oldState: any, newState: any) => {
            if (newState.member.user !== msg.author) return
            oldState
            newState
            console.log('voiceStateUpdate')
            if (newState.speaking && !oldState.speaking)
                console.log('started speaking')
            else
                console.log('stoped speaking')
        })
        // setInterval(() => {
        // }, 100)
    }
}