const fs = require('fs').promises
const { EmbedBuilder, InteractionType } = require('discord.js')
const { playMusic, deleteMessage, getSecond} = require('../../Function')

module.exports = async (client, interaction) => {
   try {
      if (!interaction.guild) {
         await interaction.reply({ content: 'Rate Limited', ephemeral: true })
         return
      }

      if (interaction.type === InteractionType.ApplicationCommand) {
         const loadCommand = async (path) => {
            try {
               const files = await fs.readdir(path)
               for (const file of files) {
                  const props = require(`${path}/${file}`)

                  if (interaction.commandName === props.name) {
                     if (props.voiceChannel && !interaction.member.voice.channelId) {
                        deleteMessage(await interaction.reply({ content: 'Join Voice Channel'}), 10000)
                        return
                     }
                     await props.run(client, interaction)
                     return
                  }
               }
            } catch (e) {
               console.log('❌    Load error\n', e)
            }
         }
         await loadCommand(__dirname + '/../../Commands')
      }

      if (interaction.isModalSubmit()) {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (interaction.customId === 'playerAddModal') {
            const songName = interaction.fields.getTextInputValue('playerAddInput')

            if (!interaction.member.voice.channel) {
               embed.setDescription('Join voice channel')
               deleteMessage(await interaction.reply({ embeds: [embed] }), 500)
            } else {
               embed.setDescription('Meowing')
               const msg = await interaction.reply({ embeds: [embed] })

               await playMusic(client, interaction, songName)
               deleteMessage(msg, 1000)
            }
         } else if (interaction.customId === 'playerSeekModal') {
            const position = getSecond(interaction.fields.getTextInputValue('playerSeekInput'))

            if (!queue || !queue.playing) {
               embed.setDescription('No music playing')
            } else if (isNaN(position)) {
               embed.setDescription('Usage: 2h 3m 4s')
            } else {
               await queue.seek(position)
               embed.setDescription(`Seeked to ${interaction.fields.getTextInputValue('playerSeekInput')}`)
            }

            deleteMessage(await interaction.reply({ embeds: [embed] }), 10000)
         } else if (interaction.customId === 'playerVolumeModal') {
            const maxVol = client.config.player.maxVol
            const vol = parseInt(interaction.fields.getTextInputValue('playerVolumeInput'))

            if (!queue || !queue.playing) {
               embed.setDescription('No music playing')
            } else if (queue.volume === vol) {
               embed.setDescription(`Volume is already set to ${vol}`)
            } else if (!vol || vol < 1 || vol > maxVol) {
               embed.setDescription(`Type a number between 1 and ${maxVol}`)
            } else {
               await queue.setVolume(vol)
               embed.setDescription(`Set the volume to ${vol}`)
            }

            deleteMessage(await interaction.reply({ embeds: [embed] }), 10000)
         }
      }
   } catch (e) {
      console.log('❌    Error\n', e)
   }
}