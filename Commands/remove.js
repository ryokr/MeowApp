const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'remove',
   description: 'Remove a song at specific position',
   voiceChannel: true,
   options: [
      {
         name: 'position',
         description: 'The position of the song, press Queue button for information',
         type: ApplicationCommandOptionType.Integer,
         required: true,
      },
   ],

   run: async (client, interaction) => {
      try {
         const position = interaction.options.getInteger('position')
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue || !queue.playing) {
            embed.setDescription('No music is currently playing')
         } else if (position < 1 || position > queue.songs.length) {
            embed.setDescription('Please provide a valid song position in the queue')
         } else {
            const removedSong = queue.songs.splice(position - 1, 1)[0]
            embed.setDescription(`Removed **${removedSong.name}**`)
         }

         deleteMessage(await interaction.reply({ embeds: [embed] }), 5000)
      } catch {
         console.log('❌    Remove Error')
      }
   }
}