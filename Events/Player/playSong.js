const { ActionRowBuilder, ButtonBuilder, EmbedBuilder} = require('discord.js')
const { capFirstChar, formatTime, updateEmbed} = require('../../Function')

module.exports = async (client, queue, song) => {
   try {
      if (queue && queue.textChannel) {
         const username = capFirstChar(song.user.tag)
         const avatar = song.user.avatarURL()
   
         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setThumbnail(client.config.player.gif)
            .setImage(song.thumbnail)
            .setAuthor({ name: '─────・ L I V E 💖・─────', iconURL: queue.textChannel.guild.iconURL() })
            .setDescription(`**[${song.name}](${song.url})**\n${song.uploader.name}・${formatTime(song.formattedDuration)}`)
            .setFooter({ text: `🧩 • ${username}`, iconURL: avatar })
            .setTimestamp()
   
         const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerQueue', label: 'Queue' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerPrev', label: 'Previous' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerStop', label: 'Stop' }).setStyle(4),
            new ButtonBuilder({ custom_id: 'playerSkip', label: 'Skip' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerLoop', label: 'Loop' }).setStyle(2),
         )
         const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerShuffle', label: 'Shuffle' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerVolume', label: 'Volume' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerAdd', label: 'Add' }).setStyle(4),
            new ButtonBuilder({ custom_id: 'playerSeek', label: 'Seek' }).setStyle(2),
            new ButtonBuilder({ custom_id: 'playerClear', label: 'Clear' }).setStyle(2),
            // new ButtonBuilder({ custom_id: '________1', label: '▬▬ From Pooba Saga' }).setStyle(2).setDisabled(true),
            // new ButtonBuilder({ custom_id: '________2', label: 'With Luv ❤️ ▬▬' }).setStyle(2).setDisabled(true),
         )
   
         const currentMessage = await queue.textChannel.send({ embeds: [embed], components: [row1, row2] }).catch(() => {})
         const collector = currentMessage.createMessageComponentCollector()
         collector.on('collect', async (interaction) => {
            if (!interaction.isButton()) return
            const embed = EmbedBuilder.from(currentMessage.embeds[0])
   
            const actions = {
               playerShuffle: async () => {
                  await require('../../Button/shuffle')(queue, embed, username, avatar)
               },
               playerPrev: async () => {
                  await require('../../Button/previous')(queue, embed, username, avatar)
               },
               playerStop: async () => {
                  await require('../../Button/stop')(queue, collector, currentMessage)
               },
               playerSkip: async () => {
                  await require('../../Button/skip')(queue, embed, username, avatar)
               },
               playerLoop: async () => {
                  await require('../../Button/loop')(queue, embed, username, avatar)
               },
               playerAdd: async () => {
                  await require('../../Button/add')(interaction)
               },
               playerQueue: async () => {
                  await require('../../Button/queue')(client, queue, embed, username, avatar)
               },
               playerClear: async () => {
                  await require('../../Button/clear')(queue, embed, username, avatar)
               },
               playerSeek: async () => {
                  await require('../../Button/seek')(interaction)
               },
               playerVolume: async () => {
                  await require('../../Button/volume')(interaction)
               },
            }
   
            const action = actions[interaction.customId]
            if (action) {
               await action().catch(() => {})
               if (interaction.customId !== 'playerStop' && interaction.customId !== 'playerAdd') {
                  updateEmbed(interaction, currentMessage, embed)
               }
            }
         })
   
         queue.lastPlayingMessage = currentMessage
      }
   } catch {
      console.log('❌    PlaySong Error')
   }
}