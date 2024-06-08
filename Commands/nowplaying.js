const { EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'nowplaying',
   description: 'Current music info',
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue || !queue.playing) {
            embed.setDescription('No music playing')
         } else {
            const song = queue.songs[0]
            embed
               .setThumbnail(song.thumbnail)
               .setAuthor({ name: 'Now Playing', iconURL: interaction.guild.iconURL() })
               .setDescription(`**[${song.name}](${song.url})**`)
               .addFields(
                  { name: 'Duration', value: `${song.formattedDuration}`, inline: true },
                  { name: 'Author', value: `${song.uploader.name}`, inline: true },
                  { name: 'Volume', value: `${queue.volume}`, inline: true },
                  { name: 'Loop Mode', value: `${queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'This Song') : 'Off'}`, inline: true,}
               )
               .setFooter({ text: `🌱 • ${song.user.tag}`, iconURL: song.user.avatarURL() })
         }

         deleteMessage(await interaction.reply({ embeds: [embed] }), 40000)
      } catch {}
   }
}