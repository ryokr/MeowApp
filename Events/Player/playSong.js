const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { capFirstChar, formatTime, loadButton, updateEmbed, auth, reject } = require('../../Function')

module.exports = async (client, queue, song) => {
   try {
      if (queue && queue.textChannel) {
         const username = 'Requested by ' + capFirstChar(song.user.globalName)
         const avatar = song.user.avatarURL()
         const duration = formatTime(song.formattedDuration)

         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setThumbnail(client.config.player.embedGif)
            .setImage(song.thumbnail)
            .setAuthor({ name: '─────・ L I V E ❤️‍🔥・─────', iconURL: queue.textChannel.guild.iconURL() })
            .setDescription(`**[${capFirstChar(song.name)}](${song.url})**\n${song.uploader.name}・${duration}`)
            .setFooter({ text: `🧩 • ${username}`, iconURL: avatar })
            .setTimestamp()

         const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerShuf', label: 'Mix', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerPrev', label: 'Back', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerStop', label: 'Stop', style: 4 }),
            new ButtonBuilder({ custom_id: 'playerSkip', label: 'Skip', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerLoop', label: 'Loop', style: 2 }),
         )
         const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerQueue', label: 'List', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerSeek', label: 'Seek', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerAdd', label: 'Add', style: 4 }),
            new ButtonBuilder({ custom_id: 'playerGrab', label: 'Grab', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerClear', label: 'Clear', style: 2 }),
         )

         const currentMessage = await queue.textChannel.send({ embeds: [embed], components: [row1, row2] }).catch(() => {})
         const listener = currentMessage.createMessageComponentCollector()

         listener.on('collect', async (interaction) => {
            if (!auth(client, interaction)) return reject(interaction)
            const embed = EmbedBuilder.from(currentMessage.embeds[0])
   
            const actions = {
               playerAdd: loadButton('../Events/Button/add', interaction),
               playerClear: loadButton('../Events/Button/clear', queue, embed, username, avatar),
               playerGrab: loadButton('../Events/Button/grab', client, queue, song, embed, username, avatar),
               playerLoop: loadButton('../Events/Button/loop', queue, embed, username, avatar),
               playerPrev: loadButton('../Events/Button/previous', queue, embed, username, avatar),
               playerQueue: loadButton('../Events/Button/queue', client, queue, embed, username, avatar),
               playerSeek: loadButton('../Events/Button/seek', interaction),
               playerShuf: loadButton('../Events/Button/shuffle', queue, embed, username, avatar),
               playerSkip: loadButton('../Events/Button/skip', queue, embed, username, avatar),
               playerStop: loadButton('../Events/Button/stop', queue, song, listener, currentMessage),
               playerVolume: loadButton('../Events/Button/volume', interaction),
            }

            await actions[interaction.customId]().catch((e) => { console.log(e) })
            if (!['playerStop', 'playerAdd'].includes(interaction.customId)) updateEmbed(interaction, currentMessage, embed)
         })

         queue.lastPlayingMessage = currentMessage
      }
   } catch {
      console.log('❌    PlaySong Error')
   }
}