module.exports = async (client, queue, song) => {
   if (queue) {
      if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return

      if (queue.textChannel) {
         const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

         const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setThumbnail(queue.songs[0].thumbnail)
            .setAuthor({
               name: 'Now Playing • 🍕',
               iconURL: client.config.guildIcon,
            })
            .setDescription(`**[${song.name}](${song.url})**`)
            .addFields(
               { name: 'Duration', value: `${song.formattedDuration}`, inline: true },
               { name: 'Author', value: `${song.uploader.name}`, inline: true }
            )
            .setFooter({
               text: `🌱 • ${song.user.tag}`,
               iconURL: song.user.avatarURL(),
            })
            .setTimestamp()

         const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel('Previous').setStyle(ButtonStyle.Secondary).setCustomId('playerPrevious'),
            new ButtonBuilder().setLabel('Pause').setStyle(ButtonStyle.Secondary).setCustomId('playerPause'),
            new ButtonBuilder().setLabel('Stop').setStyle(ButtonStyle.Danger).setCustomId('playerStop'),
            new ButtonBuilder().setLabel('Skip').setStyle(ButtonStyle.Secondary).setCustomId('playerSkip'),
            new ButtonBuilder().setLabel('Loop').setStyle(ButtonStyle.Secondary).setCustomId('playerLoop')
         )

         const message = await queue.textChannel.send({ embeds: [embed], components: [buttons] }).catch((e) => {
            console.log('❌❌❌ Sending message error\n' + e)
         })

         const collector = message.createMessageComponentCollector()

         collector.on('collect', async (btnInteraction) => {
            const queue = client.player.getQueue(client.config.guildID)
            if (!queue || !queue.playing) {
               await btnInteraction.reply({ content: 'No music playing', ephemeral: true }).catch((e) => {
                  console.log('❌❌❌ Reply error\n' + e)
               })
               return
            }

            switch (btnInteraction.customId) {
               case 'playerPrevious':
                  await queue.previous().catch((e) => {
                     console.log('❌❌❌ Previous error\n' + e)
                     btnInteraction.reply({ content: 'Error going to previous song', ephemeral: true })
                  })
                  break

               case 'playerPause':
                  if (queue.paused) {
                     queue.resume()
                     btnInteraction
                        .update({
                           components: [
                              new ActionRowBuilder().addComponents(
                                 new ButtonBuilder()
                                    .setLabel('Previous')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setCustomId('playerPrevious'),
                                 new ButtonBuilder()
                                    .setLabel('Pause')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setCustomId('playerPause'),
                                 new ButtonBuilder()
                                    .setLabel('Stop')
                                    .setStyle(ButtonStyle.Danger)
                                    .setCustomId('playerStop'),
                                 new ButtonBuilder()
                                    .setLabel('Skip')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setCustomId('playerSkip'),
                                 new ButtonBuilder()
                                    .setLabel('Loop')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setCustomId('playerLoop')
                              ),
                           ],
                        })
                        .catch((e) => {
                           console.log('❌❌❌ Update button error\n' + e)
                        })
                  } else {
                     queue.pause()
                     btnInteraction
                        .update({
                           components: [
                              new ActionRowBuilder().addComponents(
                                 new ButtonBuilder()
                                    .setLabel('Previous')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setCustomId('playerPrevious'),
                                 new ButtonBuilder()
                                    .setLabel('Resume')
                                    .setStyle(ButtonStyle.Success)
                                    .setCustomId('playerPause'),
                                 new ButtonBuilder()
                                    .setLabel('Stop')
                                    .setStyle(ButtonStyle.Danger)
                                    .setCustomId('playerStop'),
                                 new ButtonBuilder()
                                    .setLabel('Skip')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setCustomId('playerSkip'),
                                 new ButtonBuilder()
                                    .setLabel('Loop')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setCustomId('playerLoop')
                              ),
                           ],
                        })
                        .catch((e) => {
                           console.log('❌❌❌ Update button error\n' + e)
                        })
                  }
                  break

               case 'playerStop':
                  await queue.stop().catch((e) => {
                     console.log('❌❌❌ Stop error\n' + e)
                     btnInteraction.reply({ content: 'Error stopping the music', ephemeral: true })
                  })
                  break

               case 'playerSkip':
                  await queue.skip().catch((e) => {
                     console.log('❌❌❌ Skip error\n' + e)
                     btnInteraction.reply({ content: 'Error skipping song', ephemeral: true })
                  })
                  break

               case 'playerLoop':
                  let newRepeatMode = queue.repeatMode === 2 ? 0 : 2
                  queue.setRepeatMode(newRepeatMode)
                  await btnInteraction.deferUpdate().catch((e) => {
                     console.log('❌❌❌ Defer update error\n' + e)
                  })
                  break
            }
         })

         if (queue.lastPlayingMessage) {
            queue.lastPlayingMessage.delete().catch((e) => console.log(e))
         }

         queue.lastPlayingMessage = message
      }
   }
}
