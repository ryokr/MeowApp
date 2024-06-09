const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } = require('discord.js')
const { capFirstChar, formatTime, updateEmbed } = require('../../Function')

module.exports = async (client, queue, song) => {
   if (queue && queue.textChannel) {
      const username = capFirstChar(song.user.tag)
      
      const embed = new EmbedBuilder()
         .setColor(client.config.player.embedColor)
         .setThumbnail(client.config.player.gif)
         .setImage(song.thumbnail)
         .setAuthor({ name: '─────・ L I V E 💖・─────', iconURL: queue.textChannel.guild.iconURL() })
         .setDescription(`**[${song.name}](${song.url})**\n${song.uploader.name}・${formatTime(song.formattedDuration)}`)
         .setFooter({ text: `🌱 • ${username}`, iconURL: song.user.avatarURL() })
         .setTimestamp()

      // Primary = 1, Secondary = 2, Success = 3, Danger = 4, Link = 5
      const row1 = new ActionRowBuilder().addComponents(
         new ButtonBuilder({ custom_id: 'playerShuf', label: 'Shuffle' }).setStyle(2),
         new ButtonBuilder({ custom_id: 'playerPrev', label: 'Previous' }).setStyle(2),
         new ButtonBuilder({ custom_id: 'playerStop', label: 'Stop' }).setStyle(4),
         new ButtonBuilder({ custom_id: 'playerSkip', label: 'Skip' }).setStyle(2),
         new ButtonBuilder({ custom_id: 'playerLoop', label: 'Loop' }).setStyle(2),
      )
      const row2 = new ActionRowBuilder().addComponents(
         new ButtonBuilder({ custom_id: '111111111', label: '▬▬ From Pooba Saga'}).setStyle(2).setDisabled(true),
         new ButtonBuilder({ custom_id: 'playerAdd', label: 'Add',}).setStyle(4),
         new ButtonBuilder({ custom_id: '222222222', label: 'With Luv <3 ▬▬'}).setStyle(2).setDisabled(true),
      )

      const currentEmbed = await queue.textChannel.send({ embeds: [embed], components: [row1, row2] }).catch(() => {})
      const collector = currentEmbed.createMessageComponentCollector()

      collector.on('collect', async (interaction) => {
         if (!interaction.isButton()) return

         const embed = EmbedBuilder.from(currentEmbed.embeds[0])

         const actions = {
            playerShuf: async () => {
               await queue.shuffle()
               embed.setFooter({ text: `🧩 • Shuffled • ${username}`, iconURL: song.user.avatarURL() })
            },
            playerPrev: async () => {
               try {
                  await queue.previous()
               } catch {
                  embed.setFooter({ text: `🌵 • No song • ${username}`, iconURL: song.user.avatarURL() })
               }
            },
            playerStop: async () => {
               await queue.stop()
               await currentEmbed.delete().catch(() => {})
            },
            playerSkip: async () => {
               try {
                  await queue.skip()
               } catch {
                  embed.setFooter({ text: `🥑 • No song • ${username}`, iconURL: song.user.avatarURL() })
               }
            },
            playerLoop: async () => {
               const loopMode = ['Loop off', 'Loop track', 'Loop queue']

               if (queue.repeatMode === 2) await queue.setRepeatMode(0)
               else await queue.setRepeatMode(queue.repeatMode + 1)

               embed.setFooter({ text: `🥝 • ${loopMode[queue.repeatMode]} • ${username}`, iconURL: song.user.avatarURL() })
            },
            playerAdd: async () => {
               const modal = new ModalBuilder().setCustomId('playerAddModal').setTitle('Add Music')
         
               const musicInput = new TextInputBuilder()
                  .setCustomId('songName')
                  .setLabel('Name')
                  .setStyle('Short')
                  .setPlaceholder('Enter music name')
                  .setRequired(true)
         
               modal.addComponents(new ActionRowBuilder().addComponents(musicInput))
               await interaction.showModal(modal)
         
               embed.setFooter({ text: `🦚 • Added • ${username}`, iconURL: song.user.avatarURL() })
            },
         }

         const action = actions[interaction.customId]
         if (action) {
            await action().catch(() => {})
            if (interaction.customId !== 'playerStop') {
               updateEmbed(interaction, currentEmbed, embed)
            }
         }
      })

      queue.lastPlayingMessage = currentEmbed
   }
}