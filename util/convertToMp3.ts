const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)
export default (input: string, output: string) => {
    ffmpeg(input)
    .inputOptions([
        '-f s16le',
        '-ar 48000',
        '-ac 2',
        '-c pcm_s16le'
    ])
    .output(output)
    .on('error', (err: any) => {
        console.log('conversion failed\n', err)
    })
    .run()
}