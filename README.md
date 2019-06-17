# discord.js-musicplayer
A new and easier way to play music with discord.js

# Intro
I created discord.js-musicplayer because I remember how confusing playing music with discord.js was when I first started.
The goal of this project is to make it as easy as possible to play music in a Discord voice channel.

# Installation

`npm i -s discord.js-musicplayer`

# Using
You may be asking ***"How do I use it?"***. I'll solve that question.

```js
const musicplayer = require('discord.js-musicplayer')
const Player = new musicplayer.Player(client) // client is a discord.js client object
// play a song from youtube and leave the voice channel when it ends
Player.play("https://youtube.com/watch?v=s0m3vid1D", voicechannel) // voicechannel is a discord.js VoiceChannel object
.then(dispatcher => {
  dispatcher.on('end', r => {
    vc.leave()
  })
})
.catch(err => {
  console.error(err)
})
```

# Credits
All credits go to FHGDev.


###### discord.js-musicplayer is a freeware npm package published by FHGDev. Terms and Conditions are stated in LICENSE.
