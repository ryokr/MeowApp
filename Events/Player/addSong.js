const { EmbedBuilder } = require('discord.js')

module.exports = async (client, queue, song) => {
   if (queue && queue.textChannel) {
      const embed = new EmbedBuilder()
         .setColor(client.config.player.embedColor)
         .setDescription(`Added [${song.name}](${song.url})`)

      queue.textChannel.send({ embeds: [embed] }).catch(() => {})
   }
}