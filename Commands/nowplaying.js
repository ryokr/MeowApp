module.exports = {
   name: 'nowplaying',
   description: 'Current music info',
   permissions: '0x0000000000000800',
   options: [],

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const song = queue.songs[0]

         if (!queue || !queue.playing || !song)
            return interaction.reply({ content: 'No music playing', ephemeral: true }).catch(() => {})

         const { EmbedBuilder } = require('discord.js')
         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setThumbnail(song.thumbnail)
            .setAuthor({
               name: 'Now Playing',
               iconURL: interaction.guild.iconURL(),
            })
            .setDescription(`**[${song.name}](${song.url})**`)
            .addFields(
               { name: 'Duration', value: `${song.formattedDuration}`, inline: true },
               { name: 'Author', value: `${song.uploader.name}`, inline: true },
               { name: 'Volume', value: `${queue.volume}`, inline: true },
               {
                  name: 'Loop Mode',
                  value: `${queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'This Song') : 'Off'}`,
                  inline: true,
               }
            )
            .setFooter({
               text: `🌱 • ${song.user.tag}`,
               iconURL: song.user.avatarURL(),
            })
            .setTimestamp()

         const msg = await interaction.reply({ embeds: [embed] }).catch(() => {})

         setTimeout(async () => {
            if (msg) {
               await msg.delete().catch(() => {})
            }
         }, 60000)
      } catch {}
   },
}
