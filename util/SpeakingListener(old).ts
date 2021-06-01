import { GuildMember } from "discord.js"
import { EventEmitter } from 'events'

export default class SpeakingListener extends EventEmitter {

    public silenceLog: SpeakingListener.Silence[]

    private _member: GuildMember
    private _active: boolean
    private _lastTalk: number
    private _startingTime: number
    private _isTalking: boolean | null

    constructor(member: GuildMember){
        super()
        this.silenceLog = new Array<SpeakingListener.Silence>()
        this._member = member
        this._active = false
        this._lastTalk = -1
        this._startingTime = new Date().getTime()
        this._isTalking = null
        this._member.client.on('guildMemberSpeaking', (member, speaking) => {
            if (!this._active) return
            if(speaking.bitfield) {
                this.emit('talk')
                this._isTalking = true
                this._insertSilence()
            }
            else {
                this.emit('silence')
                this._isTalking = false
                this._lastTalk = new Date().getTime()
            }
        })
    }

    public isLestening() {
        return this._active
    }

    public listen() {
        this._active = true
        this._startingTime = new Date().getTime()
        this._lastTalk = new Date().getTime()
    }

    private _insertSilence() {
        if (this._lastTalk != -1) {
            const currentTime = new Date().getTime()
            const silence: SpeakingListener.Silence = {
                start: this._lastTalk - this._startingTime,
                end: currentTime - this._startingTime
            }
            this.silenceLog.push(silence)
        }
    }

    stop(){
        this._active = false
        if (!this._isTalking) {
            this._insertSilence()
        }
    }
}

namespace SpeakingListener {
    export interface Silence {
        start: number,
        end: number
    }
}