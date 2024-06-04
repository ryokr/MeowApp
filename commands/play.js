const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const https = require('https')
const { DisTubeHandler } = require('distube')
const { Playlist } = require('distube')

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
         if (!name) {
            return interaction.reply({ content: 'Type music name or link', ephemeral: true }).catch(() => {})
         }

         const embed = new EmbedBuilder().setColor(client.config.embedColor).setAuthor({
            name: 'Meowing',
            iconURL: interaction.guild.iconURL(),
         })

         const msg = await interaction.reply({ embeds: [embed] }).catch(() => {})

         try {
            if (name.includes('list=RD')) {
               const videoUrls = await getVideoUrls(name)
               const distube = new DisTubeHandler(client.player)
               const songs = []

               for (const url of videoUrls) {
                  const songInfo = await distube.resolve(url)
                  songs.push(songInfo)
               }

               const playList = new Playlist(songs)
               // console.log(playList)

               await client.player.play(interaction.member.voice.channel, playList, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                  interaction,
               })
            } else {
               await client.player.play(interaction.member.voice.channel, name, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                  interaction,
               })
            }
         } catch (error) {
            embed.setDescription('❌ Not found')
            await interaction.editReply({ embeds: [embed] }).catch(() => {})
            console.log(error)
         }

         setTimeout(async () => {
            if (msg) {
               await msg.delete().catch(() => {})
            }
         }, 5000)
      } catch (error) {
         console.error(error)
      }
   },
}

function getVideoUrls(url) {
   return new Promise((resolve, reject) => {
      https
         .get(url, (res) => {
            let data = ''

            res.on('data', (chunk) => {
               data += chunk
            })

            res.on('end', () => {
               const videoUrls = []
               const regex = /\/watch\?v=[\w-]+/g
               let match

               while ((match = regex.exec(data)) !== null) {
                  const videoUrl = `https://www.youtube.com${match[0]}`
                  if (!videoUrls.includes(videoUrl)) {
                     videoUrls.push(videoUrl)
                  }
               }

               resolve(videoUrls)
            })
         })
         .on('error', (err) => {
            reject(err)
         })
   })
}
