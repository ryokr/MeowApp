const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } = require('discord.js')
const { getTime, updateEmbed } = require('../../Function')

module.exports = async (client, queue, song) => {
   if (queue && queue.textChannel) {
      const embed = new EmbedBuilder()
         .setColor(client.config.player.embedColor)
         .setThumbnail(client.config.player.thumbnail)
         .setImage(song.thumbnail)
         .setAuthor({ name: 'Now Playing • 🍕', iconURL: client.config.guildIcon })
         .setDescription(`**[${song.name}](${song.url})**`)
         .addFields(
            { name: 'Duration', value: `${song.formattedDuration}`, inline: true },
            { name: 'Author', value: `${song.uploader.name}`, inline: true }
         )
         .setFooter({ text: `🌱 ⬪ ${song.user.tag} ⬪ ${getTime()}`, iconURL: song.user.avatarURL() })

      const row1 = new ActionRowBuilder().addComponents(
         new ButtonBuilder({ custom_id: 'playerShuf', label: 'Shuffle' }).setStyle('Secondary'),
         new ButtonBuilder({ custom_id: 'playerPrev', label: 'Previous' }).setStyle('Secondary'),
         new ButtonBuilder({ custom_id: 'playerStop', label: 'Stop' }).setStyle('Danger'),
         new ButtonBuilder({ custom_id: 'playerSkip', label: 'Skip' }).setStyle('Secondary'),
         new ButtonBuilder({ custom_id: 'playerLoop', label: 'Loop' }).setStyle('Secondary'),
         
      )

      const row2 = new ActionRowBuilder().addComponents(
         new ButtonBuilder({ custom_id: '111111111', label: '▬▬ From Pooba Saga'}).setStyle('Secondary').setDisabled(true),
         new ButtonBuilder({ custom_id: 'playerAdd', label: 'Add',}).setStyle('Success'),
         new ButtonBuilder({ custom_id: '222222222', label: 'With Luv <3 ▬▬'}).setStyle('Secondary').setDisabled(true),
      )

      const currentMsg = await queue.textChannel.send({ embeds: [embed], components: [row1, row2] }).catch(() => {})
      const collector = currentMsg.createMessageComponentCollector()

      collector.on('collect', async (interaction) => {
         if (!interaction.isButton()) return

         const embed = EmbedBuilder.from(currentMsg.embeds[0])

         const actions = {
            playerShuf: async () => {
               await queue.shuffle()
               embed.setFooter({
                  text: `🌱 ⬪ Shuffled ⬪ ${song.user.tag} ⬪ ${getTime()}`,
                  iconURL: song.user.avatarURL(),
               })
            },
            playerPrev: async () => {
               try {
                  await queue.previous()
               } catch {
                  embed.setFooter({
                     text: `🌸 ⬪ No song ⬪ ${song.user.tag} ⬪ ${getTime()}`,
                     iconURL: song.user.avatarURL(),
                  })
               }
            },
            playerStop: async () => {
               await queue.stop()
               await currentMsg.delete().catch(() => {})
            },
            playerSkip: async () => {
               try {
                  await queue.skip()
               } catch {
                  embed.setFooter({
                     text: `🥕 ⬪ No song ⬪ ${song.user.tag} ⬪ ${getTime()}`,
                     iconURL: song.user.avatarURL(),
                  })
               }
            },
            playerLoop: async () => {
               const isLoop = queue.repeatMode === 2
               await queue.setRepeatMode(isLoop ? 0 : 2)
               const loopStatus = isLoop ? 'Loop off' : 'Looping'
               embed.setFooter({
                  text: `🌱 ⬪ ${loopStatus} ⬪ ${song.user.tag} ⬪ ${getTime()}`,
                  iconURL: song.user.avatarURL(),
               })
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

               embed.setFooter({
                  text: `🦚 ⬪ Added ⬪ ${song.user.tag} ⬪ ${getTime()}`,
                  iconURL: song.user.avatarURL(),
               })
            },
         }

         const action = actions[interaction.customId]
         if (action) {
            await action().catch(() => {})
            if (interaction.customId !== 'playerStop') {
               updateEmbed(interaction, currentMsg, embed)
            }
         }
      })

      queue.lastPlayingMessage = currentMsg
   }
}