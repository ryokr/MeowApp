const { EmbedBuilder } = require('discord.js')
const { formatTime, deleteMessage } = require('../../Function')

module.exports = async (client, queue, song, embed, username, avatar, duration) => {
   const grabEmbed = new EmbedBuilder()
      .setColor(client.config.player.embedColor)
      .setImage(song.thumbnail)
      .setAuthor({ name: '─────・ I N F O R M A T I O N 💖・─────', iconURL: queue.textChannel.guild.iconURL() })
      .setDescription(`**[${song.name}](${song.url})**\n${song.uploader.name}・${duration}・Current ${formatTime(queue.formattedCurrentTime)}`)
      .setFooter({ text: `🌱 • ${username}`, iconURL: avatar })
      .setTimestamp()

   
   deleteMessage(await queue.textChannel.send({ embeds: [grabEmbed] }), 40000)

   const channel = client.channels.cache.get('1235972414287118397')
   if (!channel) {
      return
   }
   await channel.send({ embeds: [grabEmbed] })

   embed.setFooter({ text: `💽 • Song Revealed • ${username}`, iconURL: avatar })
}