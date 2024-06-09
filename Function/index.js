const { DisTubeHandler, Playlist } = require('distube')

module.exports = {
   playMusic,
   getSecond,
   deleteMessage,
   capFirstChar,
   formatTime,
   getTime,
   updateEmbed,
}

async function playMusic(client, interaction, name) {
   if (!name.includes('list=RD')) {
      playSong(client, interaction, name)
   } else {
      const listUrl = await getVideoUrls(name)
      const first = listUrl.shift()
      playSong(client, interaction, first)

      const distube = new DisTubeHandler(client.player)
      const songs = []

      for (const url of listUrl) {
         songs.push(await distube.resolve(url))
      }
      const list = new Playlist(songs)
      playSong(client, interaction, list)
   }
}
async function playSong(client, interaction, name) {
   await client.player.play(interaction.member.voice.channel, name, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction,
   })
}
async function getVideoUrls(url) {
   try {
      const response = await fetch(url)
      const data = await response.text()
      const listUrl = []
      const regex = /\/watch\?v=([\w-]+)/g
      let match

      while ((match = regex.exec(data)) !== null) {
         const videoId = match[1]
         const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
         if (!listUrl.includes(videoUrl)) {
            listUrl.push(videoUrl)
         }
      }
      return listUrl
   } catch (error) {
      throw error
   }
}

function getSecond(str) {
   if (!str) return 0

   const timeUnits = { h: 3600, m: 60, s: 1 }
   const timeParts = str.split(' ')

   let totalSeconds = 0
   for (const part of timeParts) {
      const match = part.match(/^(\d+)([hms])$/)
      if (!match) return NaN

      const value = parseInt(match[1])
      const unit = match[2]

      totalSeconds += value * timeUnits[unit]
   }
   return totalSeconds
}

function deleteMessage(message, time) {
   setTimeout(async () => {
      if (message) await message.delete().catch(() => {})
   }, time)
}

function capFirstChar(string) {
   if (!string) return ''
   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function formatTime(duration) {
   const parts = duration.split(':').map(Number)

   if (parts.length === 3) {
      return `${parts[0]}h ${parts[1]}m ${parts[2]}s`
   } else if (parts.length === 2) {
      if (parts[0] === 0) return `${parts[1]}s`
      return `${parts[0]}m  ${parts[1]}s`
   } else {
      return `${parts[0]}s`
   }
}

function getTime() {
   const time = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Bangkok',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
   })
   return `Today at ${time}`
}

async function updateEmbed(interaction, currentMsg, embed) {
   await Promise.all([currentMsg.edit({ embeds: [embed] }), interaction.deferUpdate()]).catch(() => {})
}