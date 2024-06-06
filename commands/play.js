const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { DisTubeHandler, Playlist } = require('distube')

module.exports = {
   name: 'play',
   description: 'Play music',
   permissions: '0x0000000000000800',
   voiceChannel: true,
   options: [
      {
         name: 'name',
         description: 'Type music name or link',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],

   run: async (client, interaction) => {
      const name = interaction.options.getString('name')
      if (!name) {
         return interaction.reply({ content: 'Type music name or link', ephemeral: true }).catch(() => {})
      }

      const embed = new EmbedBuilder()
         .setColor(client.config.embedColor)
         .setAuthor({ name: 'Meowing', iconURL: interaction.guild.iconURL() })

      const msg = await interaction.reply({ embeds: [embed] }).catch(() => {})

      try {
         if (!name.includes('list=RD')) {
            playSong(client, interaction, name)
         } else {
            const videoUrls = await getVideoUrls(name)
            const first = videoUrls.shift()
            playSong(client, interaction, first)

            const distube = new DisTubeHandler(client.player)
            const songs = []

            for (const url of videoUrls) {
               const songInfo = await distube.resolve(url)
               songs.push(songInfo)
            }
            const list = new Playlist(songs)

            playSong(client, interaction, list)
         }
      } catch {
         embed.setDescription('❌ Not found')
         await interaction.editReply({ embeds: [embed] }).catch(() => {})
      }

      setTimeout(() => {
         if (msg) {
            msg.delete().catch(() => {})
         }
      }, 5000)
   },
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

      const videoUrls = []
      const regex = /\/watch\?v=([\w-]+)/g
      let match

      while ((match = regex.exec(data)) !== null) {
         const videoId = match[1]
         const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
         if (!videoUrls.includes(videoUrl)) {
            videoUrls.push(videoUrl)
         }
      }
      return videoUrls
   } catch (error) {
      throw error
   }
}