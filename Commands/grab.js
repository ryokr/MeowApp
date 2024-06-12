const { EmbedBuilder } = require('discord.js')
const { formatTime, capFirstChar } = require('../Function')

module.exports = {
   name: 'grab',
   description: 'Current music info',
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)
         const loopMode = ['Off', 'Track', 'Queue']

         if (!queue || !queue.playing) {
            embed.setDescription('No music playing')
         } else {
            const song = queue.songs[0]
            embed
               .setThumbnail(song.thumbnail)
               .setAuthor({ name: '─────・ I N F O R M A T I O N 💖・─────', iconURL: interaction.guild.iconURL() })
               .setDescription(`**[${song.name}](${song.url})**`)
               .addFields(
                  { name: 'Duration', value: `${formatTime(song.formattedDuration)}`, inline: true },
                  { name: 'Current time', value: `${formatTime(queue.formattedCurrentTime)}`, inline: true },
                  { name: 'Author', value: `${song.uploader.name}`, inline: true },
                  { name: 'Volume', value: `${queue.volume}`, inline: true },
                  { name: 'Loop Mode', value: `${loopMode[queue.repeatMode]}`, inline: true },
                  { name: 'Requested by', value: `<@${song.user.id}>`, inline: true }
               )
               .setFooter({ text: `🌱 • ${capFirstChar(song.user.tag)}`, iconURL: song.user.avatarURL() })
               .setTimestamp()

            await interaction.reply({ embeds: [embed] })
         }
      } catch {}
   }
}