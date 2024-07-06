const { EmbedBuilder } = require('discord.js')
const { formatTime, deleteMessage } = require('../../Functions')

module.exports = async (client, queue, song, embed, username, avatar) => {
   const grabEmbed = new EmbedBuilder()
      .setColor('FF4400')
      .setImage(client.config.player.embedGifGrab)
      .setAuthor({ name: '─────・ I N F O R M A T I O N 💖・─────', iconURL: queue.textChannel.guild.iconURL() })
      .setDescription(`\`\`\`${song.url}\`\`\``)
      .setFooter({ text: `🌱 • ${username} • Current ${formatTime(queue.formattedCurrentTime)}`, iconURL: avatar })
      .setTimestamp()
   
   deleteMessage(await queue.textChannel.send({ embeds: [grabEmbed] }), 40000)

   const channel = client.channels.cache.get('1256209937810456607')
   if (!channel) {
      return
   }
   await channel.send(song.url)
   await channel.send({ embeds: [grabEmbed] })

   embed.setFooter({ text: `🥝 • Song Revealed • ${username}`, iconURL: avatar })
}