import fetch from 'node-fetch'

export default async (msg: any) => {
    const msgTokens = msg.content.split(' ')
    let keywords = 'cute cat'
    keywords = (msgTokens.length > 1) ? msgTokens.slice(1).join(' ') : keywords

    const url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_TOKEN}`
    const response = await fetch(url)
    const json = await response.json()
    msg.channel.send(json.results[randomIndex(json.results.length)].url)
}

let randomIndex = (length: number) => {
    return Math.floor(Math.random()*length)
}