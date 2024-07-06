const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { capFirstChar, formatTime, getMiliSeconds, updateEmbed, auth, reject } = require('../../Functions')

module.exports = async (client, queue, song) => {
   try {
      if (queue && queue.textChannel) {
         const emojiId = '794215346428968960'
         const emoji = `<:x:${emojiId}>`
         const duration = formatTime(song.formattedDuration)

         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setThumbnail(client.config.player.embedGif)
            .setImage(song.thumbnail)
            .setTimestamp()
            .setAuthor({ name: '─────・ L I V E ❤️‍🔥・─────', iconURL: queue.textChannel.guild.iconURL() })
            .setFooter({ text: `🧩 Requested by ${capFirstChar(song.user.globalName)}`, iconURL: song.user.avatarURL() })
            .setDescription(`**[${capFirstChar(song.name)}](${song.url})**\n${song.uploader.name}・${duration}`)

         const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerShuf', label: 'Mix',  style: 2 }),
            new ButtonBuilder({ custom_id: 'playerPrev', label: 'Back', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerStop', label: 'Stop', style: 4 }),
            new ButtonBuilder({ custom_id: 'playerSkip', label: 'Skip', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerLoop', label: 'Loop', style: 2 }),
         )
         const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerQueue', label: 'List',  style: 2 }),
            new ButtonBuilder({ custom_id: 'playerSeek',  label: 'Seek',  style: 2 }),
            new ButtonBuilder({ custom_id: 'playerAdd',   label: 'Add',   style: 4 }),
            new ButtonBuilder({ custom_id: 'playerGrab',  label: 'Grab',  style: 2 }),
            new ButtonBuilder({ custom_id: 'playerClear', label: 'Clear', style: 2 }),
         )

         const currentMessage = await queue.textChannel.send({ embeds: [embed], components: [row1, row2] }).catch(() => {})
         const listener = currentMessage.createMessageComponentCollector({ time: getMiliSeconds(duration) })
         queue.lastPlayingMessage = currentMessage

         listener.on('collect', async (interaction) => {
            if (!auth(client, interaction)) return reject(interaction)
            await client.buttons.get(interaction.customId).run(interaction, client, queue, embed).catch((e) => console.log(e))
            if (!['playerStop', 'playerAdd'].includes(interaction.customId)) updateEmbed(interaction, currentMessage, embed)
         })
      }
   } catch {
      console.log('❌    PlaySong Error')
   }
}