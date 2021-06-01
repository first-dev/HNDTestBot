import fs from 'fs'

export default (filePath: fs.PathLike, silenceLog: Silence[]) => {
    const rawRecord: Uint8Array = fs.readFileSync(filePath)
    const outputChunks: Uint8Array[] = []
    silenceLog.forEach((element, index, array) => {
        const audioStart = element.position
        let audioEnd: number
        if (index+1 < array.length)
            audioEnd = array[index+1].position
        else
            audioEnd = rawRecord.length
    
        const silenceChunk = new Uint8Array(element.length)
        const audioChunk = rawRecord.slice(audioStart, audioEnd)
    
        outputChunks.push(silenceChunk)
        outputChunks.push(audioChunk)
    
    })
    let totalLength = 0
    outputChunks.forEach(element => {
        totalLength += element.length
    })
    const outputBuffer = new Uint8Array(totalLength)
    let currentIndex = 0
    outputChunks.forEach(element => {
        outputBuffer.set(element, currentIndex)
        currentIndex += element.length
    })
    fs.writeFileSync(filePath, outputBuffer)  
}

export interface Silence {
    position: number,
    length: number
}
