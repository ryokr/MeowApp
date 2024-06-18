const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { DisTubeHandler, Playlist } = require('distube')

module.exports = {
   getStatus,
   playMusic,
   getSecond,
   deleteMessage,
   capFirstChar,
   formatTime,
   loadButton,
   getTime,
   updateEmbed,
   generateQueuePage,
   queueActionRow,
}

function getStatus() {
   const statuses = ['online', 'idle', 'dnd']
   return statuses[Math.floor(Math.random()*3)]
}

// Play
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
   }).catch(() => {})
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

// Seek
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
   if (duration === 'Live') return duration
   
   const parts = duration.split(':').map(Number)

   if (parts.length === 3) {
      return `${parts[0]}h ${parts[1]}m ${parts[2]}s`
   } else if (parts.length === 2) {
      if (parts[0] === 0) return `${parts[1]}s`
      return `${parts[0]}m ${parts[1]}s`
   } else {
      return `${parts[0]}s`
   }
}

function loadButton(path, ...args) {
   return async () => require(path)(...args)
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

// Queue reveal
function generateQueuePage(client, queue, start, page, total, pageLength, songList) {
   let index = start + 1
   const current = songList.slice(start, start + pageLength)
   return new EmbedBuilder()
      .setColor(client.config.player.embedColor)
      .setAuthor({ name: '─────・ P L A Y  L I S T 🌱・─────', iconURL: queue.textChannel.guild.iconURL() })
      .setDescription(current.map((song) => `\n${index++}. [${song.name}](${song.url})`).join(''))
      .setFooter({ text: `💽 • Page ${page} / ${total}` })
}
function queueActionRow(page, total) {
   return new ActionRowBuilder().addComponents(
      new ButtonBuilder({ custom_id: 'queueFirst', label: 'First Page' }).setStyle(2).setDisabled(page === 1),
      new ButtonBuilder({ custom_id: 'queueBack', label: 'Previous Page' }).setStyle(2).setDisabled(page === 1),
      new ButtonBuilder({ custom_id: 'queueNext', label: 'Next Page' }).setStyle(2).setDisabled(page === total),
      new ButtonBuilder({ custom_id: 'queueLast', label: 'Last Page' }).setStyle(2).setDisabled(page === total),
      new ButtonBuilder({ custom_id: 'queueClose', label: 'Close' }).setStyle(4)
   )
}