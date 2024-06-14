const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { capFirstChar, formatTime, updateEmbed, getSecond } = require('../../Function')

module.exports = async (client, queue, song) => {
   try {
      if (queue && queue.textChannel) {
         const username = capFirstChar(song.user.tag)
         const avatar = song.user.avatarURL()
         const duration = formatTime(song.formattedDuration)

         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setThumbnail(client.config.player.gif)
            .setImage(song.thumbnail)
            .setAuthor({ name: '─────・ L I V E 💖・─────', iconURL: queue.textChannel.guild.iconURL() })
            .setDescription(`**[${song.name}](${song.url})**\n${song.uploader.name}・${duration}`)
            .setFooter({ text: `🧩 • ${username}`, iconURL: avatar })
            .setTimestamp()

         const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerShuf', label: 'Shuf' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerPrev', label: 'Back' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerStop', label: 'Stop' }).setStyle(4),
            new ButtonBuilder({ custom_id: 'playerSkip', label: 'Skip' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerLoop', label: 'Loop' }).setStyle(2)
         )
         const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerQueue', label: 'List' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerVol', label: 'Vol' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerAdd', label: 'Add' }).setStyle(4),
            new ButtonBuilder({ custom_id: 'playerSeek', label: 'Seek' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerClear', label: 'Clear' }).setStyle(2)
         )

         const currentMessage = await queue.textChannel.send({ embeds: [embed], components: [row1, row2] }).catch(() => {})
         const collector = currentMessage.createMessageComponentCollector({ time: getSecond(duration) * 1000 + 10000 })

         collector.on('collect', async (interaction) => {
            if (!interaction.isButton()) return
            const embed = EmbedBuilder.from(currentMessage.embeds[0])

            const actions = {
               playerAdd: async () => await require('../Button/add')(interaction),
               playerClear: async () => await require('../Button/clear')(queue, embed, username, avatar),
               playerLoop: async () => await require('../Button/loop')(queue, embed, username, avatar),
               playerPrev: async () => await require('../Button/previous')(queue, embed, username, avatar),
               playerQueue: async () => await require('../Button/queue')(client, queue, embed, username, avatar),
               playerSeek: async () => await require('../Button/seek')(interaction),
               playerShuf: async () => await require('../Button/shuffle')(queue, embed, username, avatar),
               playerSkip: async () => await require('../Button/skip')(queue, embed, username, avatar),
               playerStop: async () => await require('../Button/stop')(queue, song, collector, currentMessage),
               playerVol: async () => await require('../Button/volume')(interaction),
            }

            const action = actions[interaction.customId]
            if (action) {
               await action().catch(() => {})
               if (interaction.customId !== 'playerStop' && interaction.customId !== 'playerAdd') {
                  updateEmbed(interaction, currentMessage, embed)
               }
            }
         })
         collector.on('end', async () => {
            await currentMessage.delete().catch(() => {})
         })
         queue.lastPlayingMessage = currentMessage
      }
   } catch {
      console.log('❌    PlaySong Error')
   }
}