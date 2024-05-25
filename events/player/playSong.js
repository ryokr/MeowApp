const { EmbedBuilder } = require('discord.js')

module.exports = async (client, queue, song) => {
   if (queue) {
      if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return

      if (queue.textChannel) {
         const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setThumbnail(queue.songs[0].thumbnail)
            .setAuthor({
               name: 'Now Playing • 🍕',
               iconURL: client.config.guildIcon,
            })
            .setDescription(`**[${song.name}](${song.url})**`)
            .addFields(
               { name: 'Duration', value: `${song.formattedDuration}`, inline: true },
               { name: 'Author', value: `${song.uploader.name}`, inline: true }
            )
            .setFooter({
               text: `🌱 • ${song.user.tag}`,
               iconURL: song.user.avatarURL(),
            })
            .setTimestamp()

         if (queue.lastPlayingMessage) {
            queue.lastPlayingMessage.delete().catch((e) => console.log(e))
         }

         queue.textChannel
            .send({ embeds: [embed] })
            .then((msg) => {
               queue.lastPlayingMessage = msg
            })
            .catch((e) => console.log(e))
      }
   }
}