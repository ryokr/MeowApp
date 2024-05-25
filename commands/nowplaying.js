module.exports = {
   name: 'nowplaying',
   description: 'Current music info',
   permissions: '0x0000000000000800',
   options: [],

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const track = queue.songs[0]

         if (!queue || !queue.playing || !track) 
            return interaction.reply({ content: `No music playing`, ephemeral: true }).catch((e) => {})
         
         const { EmbedBuilder } = require('discord.js')
         const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setThumbnail(track.thumbnail)
            .setAuthor({
               name: 'Now Playing',
               iconURL: interaction.guild.iconURL(),
            })
            .setDescription(`**[${track.name}](${track.url})**`)
            .addFields(
               { name: 'Duration', value: `${track.formattedDuration}`, inline: true },
               { name: 'Author', value: `${track.uploader.name}`, inline: true },
               { name: 'Volume', value: `${queue.volume}`, inline: true },
               { name: 'Loop Mode', value: `${queue.repeatMode ? queue.repeatMode === 2 ? "Queue" : "This Song" : "Off"}`, inline: true },
            )
            .setFooter({
               text: `🌱 • ${track.user.tag}`,
               iconURL: track.user.avatarURL(),
            })
            .setTimestamp()

         interaction.reply({ embeds: [embed] }).catch((e) => {
            console.log(e)
         })
      } catch (e) {}
   }
}