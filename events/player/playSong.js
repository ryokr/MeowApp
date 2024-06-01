const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

module.exports = async (client, queue, song) => {
   if (queue && queue.textChannel) {
      const embed = createEmbed(client, queue, song)
      const buttons = createButtons()
      const currentMsg = await queue.textChannel.send({ embeds: [embed], components: [buttons] }).catch()
      const collector = currentMsg.createMessageComponentCollector()

      collector.on('collect', async (button) => {
         const queue = client.player.getQueue(client.config.guildID)
         const embed = EmbedBuilder.from(currentMsg.embeds[0])

         switch (button.customId) {
            case 'playerShuffle':
               await handleShuffle(queue, embed, song, button, currentMsg)
               break

            case 'playerPrevious':
               await handlePrevious(queue, embed, song, button, currentMsg)
               break

            case 'playerStop':
               await handleStop(queue, currentMsg)
               break

            case 'playerSkip':
               await handleSkip(queue, embed, song, button, currentMsg)
               break

            case 'playerLoop':
               await handleLoop(queue, embed, song, button, currentMsg)
               break
         }
      })

      queue.lastPlayingMessage = currentMsg
   }
}

function createEmbed(client, queue, song) {
   return new EmbedBuilder()
      .setColor(client.config.embedColor)
      .setThumbnail(queue.songs[0].thumbnail)
      .setAuthor({ name: 'Now Playing • 🍕', iconURL: client.config.guildIcon })
      .setDescription(`**[${song.name}](${song.url})**`)
      .addFields(
         { name: 'Duration', value: `${song.formattedDuration}`, inline: true },
         { name: 'Author', value: `${song.uploader.name}`, inline: true }
      )
      .setFooter({ text: `🌱 ⬪ ${song.user.tag} ⬪ ${getTimestamp()}`, iconURL: song.user.avatarURL() })
}

function createButtons() {
   return new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('playerShuffle').setLabel('Shuffle').setStyle('Secondary'),
      new ButtonBuilder().setCustomId('playerPrevious').setLabel('Previous').setStyle('Secondary'),
      new ButtonBuilder().setCustomId('playerStop').setLabel('Stop').setStyle('Danger'),
      new ButtonBuilder().setCustomId('playerSkip').setLabel('Skip').setStyle('Secondary'),
      new ButtonBuilder().setCustomId('playerLoop').setLabel('Loop').setStyle('Secondary')
   )
}

async function handleShuffle(queue, embed, song, button, currentMsg) {
   await queue.shuffle()
   updateFooter(embed, `🌱 ⬪ Shuffled ⬪ ${song.user.tag} ⬪ ${getTimestamp()}`, song.user.avatarURL())
   await updateEmbed(button, currentMsg, embed)
}

async function handlePrevious(queue, embed, song, button, currentMsg) {
   try {
      await queue.previous()
   } catch (e) {
      updateFooter(embed, `🌸 ⬪ No previous ⬪ ${song.user.tag} ⬪ ${getTimestamp()}`, song.user.avatarURL())
      await updateEmbed(button, currentMsg, embed)
   }
}

async function handleStop(queue, currentMsg) {
   try {
      await queue.stop()
      await currentMsg.delete()
   } catch (e) {}
}

async function handleSkip(queue, embed, song, button, currentMsg) {
   try {
      await queue.skip()
   } catch (e) {
      updateFooter(embed, `🌸 ⬪ No song ⬪ ${song.user.tag} ⬪ ${getTimestamp()}`, song.user.avatarURL())
      await updateEmbed(button, currentMsg, embed)
   }
}

async function handleLoop(queue, embed, song, button, currentMsg) {
   const isLooping = queue.repeatMode === 2
   queue.setRepeatMode(isLooping ? 0 : 2)
   const loopStatus = isLooping ? 'Loop off' : 'Looping'
   updateFooter(embed, `🌱 ⬪ ${loopStatus} ⬪ ${song.user.tag} ⬪ ${getTimestamp()}`, song.user.avatarURL())
   await updateEmbed(button, currentMsg, embed)
}

function getTimestamp() {
   const time = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Bangkok',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
   })
   return `Today at ${time}`
}

function updateFooter(embed, text, iconURL) {
   embed.setFooter({ text, iconURL })
}

async function updateEmbed(button, currentMsg, embed) {
   try {
      await Promise.all([currentMsg.edit({ embeds: [embed] }).catch(), button.deferUpdate().catch()])
   } catch (e) {}
}