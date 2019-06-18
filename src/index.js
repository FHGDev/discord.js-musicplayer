const ytdl = require('ytdl-core')
const fetch = require('node-fetch')

class MusicPlayer {
  constructor(client, options = {}) {
    this.client = client
    this.options = options
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
  
  /**
  * Searches YouTube for a certain video
  * @param {String} q Title of the video to search for
  * @returns {Promise}
  */
  search(q) {
    return new Promise((res, rej) => {
      fetch(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(q)}&key=${options.apikey}`, {method: "GET"})
      .then(r => r.json())
      .then(json => {
        if (json.items) {
          res(json.items[0].id.videoId)
        } else {
          rej("Not found")
        }
      })
      .catch(rej)
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
