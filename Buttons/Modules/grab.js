const { EmbedBuilder } = require('discord.js')
const { formatTime, deleteMessage, capFirstChar } = require('../../Functions')

module.exports = async (interaction, client, queue, embed) => {
   const grabEmbed = new EmbedBuilder()
      .setColor(client.config.player.embedColor)
      .setImage(client.config.player.embedGifGrab)
      .setAuthor({ name: '─────・ I N F O R M A T I O N 💖・─────', iconURL: queue.textChannel.guild.iconURL() })
      .setDescription(`\`\`\`${queue.songs[0].url}\`\`\``)
      .setFooter({ text: `🌱 Current time ${formatTime(queue.formattedCurrentTime)}`, iconURL: queue.songs[0].user.avatarURL() })
      .setTimestamp()
   
   deleteMessage(await queue.textChannel.send({ embeds: [grabEmbed] }), 40000)

   const channel = client.channels.cache.get('1256209937810456607')
   if (!channel) {
      return
   }
   await channel.send(queue.songs[0].url)
   await channel.send({ embeds: [grabEmbed.setColor('FF4400')] })

   embed.setFooter({ text: `🌸 Song revealed by ${capFirstChar(interaction.user.globalName)}`, iconURL: interaction.user.avatarURL() })
}