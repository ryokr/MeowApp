const { EmbedBuilder } = require('discord.js')
const { formatTime, deleteMessage, capFirstChar } = require('../Functions')

module.exports = {
   name: 'playerGrab',
   run: async (interaction, client, queue, embed) => {
      const grabEmbed = new EmbedBuilder()
         .setColor(client.config.player.embedColor)
         .setImage(client.config.player.embedGifGrab)
         .setAuthor({ name: '─────・ I N F O R M A T I O N 💖・─────', iconURL: queue.textChannel.guild.iconURL() })
         .setDescription(`\`\`\`${queue.songs[0].url}\`\`\``)
         .setFooter({ text: `🌱 Current time ${formatTime(queue.formattedCurrentTime)}`, iconURL: queue.songs[0].user.avatarURL() })
         .setTimestamp()

      deleteMessage(queue.textChannel.send({ embeds: [grabEmbed] }), 40000)
      embed.setFooter({ text: `🥝 Song revealed by ${capFirstChar(interaction.user.globalName)}`, iconURL: interaction.user.avatarURL() })

      const channel = client.channels.cache.get('1256209937810456607')
      if (!channel) return
      channel.send(queue.songs[0].url)
      channel.send({ embeds: [grabEmbed.setColor('FF4400')] })

      if (interaction.guild.id === client.config.player.guildId) {
         const addEmbed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setThumbnail(queue.songs[0].thumbnail)
            .setDescription(`Added [${queue.songs[0].name}](${queue.songs[0].url})・Requested by <@${queue.songs[0].user.id}>`)

      queue.textChannel.send({ embeds: [addEmbed] }).catch(() => {})
      }
   }
}