const { EmbedBuilder } = require('discord.js')
const { formatTime } = require('../../Function')

module.exports = async (client, queue, song, embed, username, avatar, duration) => {
   const grabEmbed = new EmbedBuilder()
      .setColor(client.config.player.embedColor)
      .setImage(song.thumbnail)
      .setAuthor({ name: '─────・ I N F O R M A T I O N 💖・─────', iconURL: queue.textChannel.guild.iconURL() })
      .setDescription(`**[${song.name}](${song.url})**\n${song.uploader.name}・${duration}・Current ${formatTime(queue.formattedCurrentTime)}`)
      // .addFields(
      //    { name: 'Author', value: `${song.uploader.name}`, inline: true },
      //    { name: 'Duration', value: `${duration}`, inline: true },
      //    { name: 'Current Time', value: `${formatTime(queue.formattedCurrentTime)}`, inline: true },
      // )
      .setFooter({ text: `🌱 • Requested by ${username}`, iconURL: avatar })
      .setTimestamp()

   await queue.textChannel.send({ embeds: [grabEmbed] })
   embed.setFooter({ text: `💽 • Info revealed • ${username}`, iconURL: avatar })

   const channel = client.channels.cache.get('1235972414287118397');
   if (!channel) {
      return
   }
   await channel.send({ embeds: [grabEmbed] });
}