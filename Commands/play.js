const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { DisTubeHandler, Playlist } = require('distube')
const { getVideoUrls, deleteMessage } = require('../Function')

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
      try {
         const name = interaction.options.getString('name')
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)
         if (!name) {
            embed.setDescription('Please type music name or link')
            const msg = await interaction.reply({ embeds: [embed] })
            deleteMessage(msg, 10000)
         } else {
            embed.setDescription('Meowing')
            const msg = await interaction.reply({ embeds: [embed] })

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
               embed.setDescription('Not found')
               await interaction.editReply({ embeds: [embed] })
            }

            deleteMessage(msg, 10000)
         }
      } catch {
         console.log('❌    Play Error')
      }
   }
}

async function playSong(client, interaction, name) {
   await client.player.play(interaction.member.voice.channel, name, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction,
   })
}