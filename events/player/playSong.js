const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } = require('discord.js')

module.exports = async (client, queue, song) => {
   if (queue && queue.textChannel) {
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

      const buttons1 = new ActionRowBuilder().addComponents(
         new ButtonBuilder({ custom_id: 'playerShuffle', label: 'Shuffle' }).setStyle('Secondary'),
         new ButtonBuilder({ custom_id: 'playerPrev', label: 'Previous' }).setStyle('Secondary'),
         new ButtonBuilder({ custom_id: 'playerStop', label: 'Stop' }).setStyle('Danger'),
         new ButtonBuilder({ custom_id: 'playerSkip', label: 'Skip' }).setStyle('Secondary'),
         new ButtonBuilder({ custom_id: 'playerLoop', label: 'Loop' }).setStyle('Secondary'),
         
      )

      const buttons2 = new ActionRowBuilder().addComponents(
         new ButtonBuilder({ custom_id: '1', label: '▬▬ From Pooba Saga'}).setStyle('Secondary').setDisabled(true),
         new ButtonBuilder({ custom_id: '2', label: 'With Luv <3 ▬▬'}).setStyle('Secondary').setDisabled(true),
         new ButtonBuilder({ custom_id: 'playerAdd', label: 'Add',}).setStyle('Success'),
      )

      const currentMsg = await queue.textChannel.send({ embeds: [embed], components: [buttons1, buttons2] }).catch(() => {})
      const collector = currentMsg.createMessageComponentCollector()

      collector.on('collect', async (interaction) => {
         if (!interaction.isButton()) return

         const embed = EmbedBuilder.from(currentMsg.embeds[0])

         const actions = {
            playerShuffle: async () => {
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
               const isLooping = queue.repeatMode === 2
               await queue.setRepeatMode(isLooping ? 0 : 2)
               const loopStatus = isLooping ? 'Loop off' : 'Looping'
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

      client.on('interactionCreate', async (interaction) => {
         if (!interaction.isModalSubmit()) return

         if (interaction.customId === 'playerAddModal') {
            const songName = interaction.fields.getTextInputValue('songName')
            const member = interaction.member
            const voiceChannel = member.voice.channel
            let msg = null

            if (!voiceChannel) msg = await interaction.reply({ content: 'Join voice channel' }).catch(() => {})

            msg = await interaction.reply({ content: 'Meowing' }).catch(() => {})
            await client.player.play(voiceChannel, songName, { member }).catch(() => {})

            setTimeout(async () => {
               if (msg) {
                  await msg.delete().catch(() => {})
               }
            }, 1000)
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

async function updateEmbed(interaction, currentMsg, embed) {
   await Promise.all([currentMsg.edit({ embeds: [embed] }), interaction.deferUpdate()]).catch(() => {})
}
