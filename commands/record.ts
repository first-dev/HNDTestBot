import fs from 'fs'
import { WriteStream } from 'fs'
import { Message } from 'discord.js'
import { GuildMember } from 'discord.js'
import join from './join'
import converter from '../util/convertToMp3'
import silenceInserter from '../util/SilenceInsert'
import { Silence } from '../util/SilenceInsert';

export default async (msg: Message) => {
    if (global.isRecording) {
        msg.channel.send('Already recording')
        return
    }

    const connection = await join(msg)
    if (!connection) return

    const recordUser = (member: GuildMember) => {
        const d = new Date()
        const fileName = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}-${member.user.tag}`
        console.log(fileName)
        const audioPath = `./records/${fileName}.pcm`
        const audioMp3Path = `./records/${fileName}.mp3`
        
        const silenceLog = new Array<Silence>()
        let writeStream: WriteStream
        let lastTalk = new Date().getTime()
        let chunksCount = 0
        let isTalking = false
        global.isRecording = true

        const pushSilence = () => {
            const position = 3840 * chunksCount
            const silenceDuration = new Date().getTime() - lastTalk
            const length = silenceDuration * 192
            silenceLog.push({
                position,
                length
            })            
        }
        const startRecord = () => {
            if (fs.existsSync(audioPath)) {
                fs.unlinkSync(audioPath)
            }
            const startSteam = () => {
                if (global.isRecording) {
                    writeStream = fs.createWriteStream(audioPath, {flags: 'a'})
                    .on('finish', () => {
                    })
                    
                    connection.receiver.createStream(member, {
                        end: 'silence',
                        mode: 'pcm'
                    })
                    .on('data', (chunk: Uint8Array) => {
                        if (!isTalking) { // just started talking after silence
                            pushSilence()
                            isTalking = true
                        }
                        chunksCount++
                    })
                    .on('end', () => {
                        isTalking = false
                        lastTalk = new Date().getTime()
                        startSteam()
                    })
                    .pipe(writeStream)
                }
            }
            startSteam()
        }
        const endRecord = () =>{
            pushSilence()
            writeStream.close()
            silenceInserter(audioPath, silenceLog)
            converter(audioPath, audioMp3Path)
            msg.channel.send('Finished recording')
        }
        let intervalId = setInterval(() => {
            if (!global.isRecording) {
                endRecord()
                clearInterval(intervalId)
            }
        }, 100)
        
        startRecord()
    }

    recordUser(msg.member!)
}