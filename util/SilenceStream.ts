// 1 chunk = Uint8Array(3840) = 20ms

import { Readable } from 'stream'

export default class SilenceStream {

    protected _stream: Readable
    protected _chunk: Uint8Array | null
    protected _isReading: boolean

    constructor() {
        this._chunk = new Uint8Array(3840)
        this._isReading = false
        const silenceStream = this
        this._stream = new Readable({
            read(){
                if (!silenceStream._isReading) {
                    setTimeout(() => {
                        silenceStream._isReading = false
                        this.push(silenceStream._chunk)
                        console.log('chunk pushed')
                    }, 20)
                    silenceStream._isReading = true
                }
            }
        })
    }
    
    public get stream() : Readable {
        return this._stream
    }

    public end() {
        this._chunk = null
    }
}