const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')

module.exports = async (client, queue, song) => {
   if (queue) {
      if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return

      if (queue.textChannel) {
         const now = new Date()
         const timestamp = `Today at ${now.getHours().toString().padStart(2, '0')}:${now
            .getMinutes()
            .toString()
            .padStart(2, '0')}`

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
               text: `🌱 ⬪ ${song.user.tag} ⬪ ${timestamp}`,
               iconURL: song.user.avatarURL(),
            })

         const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel('Shuffle').setStyle(ButtonStyle.Secondary).setCustomId('playerShuffle'),
            new ButtonBuilder().setLabel('Previous').setStyle(ButtonStyle.Secondary).setCustomId('playerPrevious'),
            new ButtonBuilder().setLabel('Stop').setStyle(ButtonStyle.Danger).setCustomId('playerStop'),
            new ButtonBuilder().setLabel('Skip').setStyle(ButtonStyle.Secondary).setCustomId('playerSkip'),
            new ButtonBuilder().setLabel('Loop').setStyle(ButtonStyle.Secondary).setCustomId('playerLoop'),
         )

         const currentMessage = await queue.textChannel.send({ embeds: [embed], components: [buttons] }).catch((e) => {
            console.log('❌    Sending message error\n' + e)
         })

         const collector = currentMessage.createMessageComponentCollector()

         collector.on('collect', async (btnInteraction) => {
            const queue = client.player.getQueue(client.config.guildID)

            if (!queue || !queue.playing) {
               await btnInteraction.reply({ content: 'No music playing', ephemeral: true }).catch((e) => {
                  console.log('❌    Reply error\n' + e)
               })
               return
            }

            switch (btnInteraction.customId) {
               case 'playerShuffle':
                  await queue.shuffle()

                  const shuffleEmbed = EmbedBuilder.from(currentMessage.embeds[0]).setFooter({
                     text: `🌱 ⬪ Shuffled ⬪ ${song.user.tag} ⬪ ${timestamp}`,
                     iconURL: song.user.avatarURL(),
                  })

                  await currentMessage.edit({ embeds: [shuffleEmbed] }).catch((e) => {
                     console.log('❌    Edit message error\n' + e)
                  })

                  await btnInteraction.deferUpdate().catch((e) => {
                     console.log('❌    Defer update error\n' + e)
                  })
                  break

               case 'playerPrevious':
                  await queue.previous().catch((e) => {
                     console.log('❌    Previous error\n' + e)
                     btnInteraction.reply({ content: 'Error going to previous song', ephemeral: true })
                  })
                  break

               case 'playerStop':
                  await queue.stop().catch((e) => {
                     console.log('❌    Stop error\n' + e)
                     btnInteraction.reply({ content: 'Error stopping the music', ephemeral: true })
                  })
                  currentMessage.delete().catch((e) => console.log('PS Stop\n' + e))
                  break

               case 'playerSkip':
                  await queue.skip().catch((e) => {
                     console.log('❌    Skip error\n' + e)
                     btnInteraction.reply({ content: 'Error skipping song', ephemeral: true })
                  })
                  break

               case 'playerLoop':
                  queue.setRepeatMode(queue.repeatMode === 2 ? 0 : 2)

                  const loopText =
                     queue.repeatMode === 2
                        ? `🌱 ⬪ Looping ⬪ ${song.user.tag} ⬪ ${timestamp}`
                        : `🌱 ⬪ ${song.user.tag} ⬪ ${timestamp}`

                  const loopEmbed = EmbedBuilder.from(currentMessage.embeds[0]).setFooter({
                     text: loopText,
                     iconURL: song.user.avatarURL(),
                  })

                  await currentMessage.edit({ embeds: [loopEmbed] }).catch((e) => {
                     console.log('❌    Edit message error\n' + e)
                  })

                  await btnInteraction.deferUpdate().catch((e) => {
                     console.log('❌    Defer update error\n' + e)
                  })
                  break
            }
         })
         client.config.opt.currentMessage = currentMessage
      }

      
   }
}
