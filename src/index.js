const ytdl = require('ytdl-core')
const fetch = require('node-fetch')

class MusicPlayer {
  constructor(client) {
    this.client = client
  }
  
  /**
  * Plays a YouTube video in the voice channel provided by the 'vc' parameter.
  * @param {String} url A valid YouTube video url.
  * @param {VoiceChannel} vc A valid Discord.js VoiceChannel. [View Documentation](https://discord.js.org/#/docs/main/stable/class/VoiceChannel "VoiceChannel documentation")
  * @returns {Promise} A promise that returns a dispatcher when resolved.
  */
  play(url, vc) {
    return new Promise((resolve, reject) => {
        if (!isYt(url)) reject(new Error(`'${url}' is not a valid YouTube video url.`))
        if (!url) reject(new Error(`The 'url' parameter is missing.`))
        if (!vc) reject(new Error(`The 'vc' parameter is missing.`))
            
        vc.join().then(c => {
            const stream = ytdl(url, { audioonly: true })

            var dispatcher = c.playStream(stream)

            resolve(dispatcher)
        })
    })
  }
}

module.exports = {
  Player: MusicPlayer
}
/**
 * Determines whether a string is a YouTube URL or not.
 * @param {String} url 
 * @returns {Boolean} A boolean that specifies if the string is a youtube url or not.
 */
function isYt(url) {
  return url.toLowerCase().indexOf(`youtube.com`) > -1;
}
