module.exports = async (client, queue, song) => {
   if (queue && queue.textChannel) {
      const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

      const embed = new EmbedBuilder()
         .setColor(client.config.embedColor)
         .setThumbnail(song.thumbnail)
         .setAuthor({ name: 'Now Playing • 🍕', iconURL: client.config.guildIcon })
         .setDescription(`**[${song.name}](${song.url})**`)
         .addFields(
            { name: 'Duration', value: `${song.formattedDuration}`, inline: true },
            { name: 'Author', value: `${song.uploader.name}`, inline: true }
         )
         .setFooter({ text: `🌱 ⬪ ${song.user.tag} ⬪ ${getTime()}`, iconURL: song.user.avatarURL() })

      const buttons = new ActionRowBuilder().addComponents(
         new ButtonBuilder().setCustomId('playerShuffle').setLabel('Shuffle').setStyle('Secondary'),
         new ButtonBuilder().setCustomId('playerPrevious').setLabel('Previous').setStyle('Secondary'),
         new ButtonBuilder().setCustomId('playerStop').setLabel('Stop').setStyle('Danger'),
         new ButtonBuilder().setCustomId('playerSkip').setLabel('Skip').setStyle('Secondary'),
         new ButtonBuilder().setCustomId('playerLoop').setLabel('Loop').setStyle('Secondary')
      )

      const currentMsg = await queue.textChannel.send({ embeds: [embed], components: [buttons] }).catch(() => {})
      const collector = currentMsg.createMessageComponentCollector()

      collector.on('collect', async (button) => {
         const embed = EmbedBuilder.from(currentMsg.embeds[0])

         const actions = {
            playerShuffle: async () => {
               await queue.shuffle()
               embed.setFooter({
                  text: `🌱 ⬪ Shuffled ⬪ ${song.user.tag} ⬪ ${getTime()}`,
                  iconURL: song.user.avatarURL(),
               })
            },
            playerPrevious: async () => {
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
                     text: `🌸 ⬪ No song ⬪ ${song.user.tag} ⬪ ${getTime()}`,
                     iconURL: song.user.avatarURL(),
                  })
               }
            },
            playerLoop: async () => {
               const isLooping = queue.repeatMode === 2
               await queue.setRepeatMode(isLooping ? 0 : 2)
               const loopStatus = isLooping ? 'Loop off' : 'Looping'
               embed.setFooter({
                  text: `🌱 ⬪ ${loopStatus} ⬪ ${song.user.tag} ⬪ ${getTime()}`,
                  iconURL: song.user.avatarURL(),
               })
            },
         }

         const action = actions[button.customId]
         if (action) {
            await action().catch(() => {})
            if (button.customId !== 'playerStop') {
               updateEmbed(button, currentMsg, embed)
            }
         }
      })

      queue.lastPlayingMessage = currentMsg
   }
}

function getTime() {
   const time = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Bangkok',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
   })
   return `Today at ${time}`
}

async function updateEmbed(button, currentMsg, embed) {
   await Promise.all([currentMsg.edit({ embeds: [embed] }), button.deferUpdate()]).catch(() => {})
}