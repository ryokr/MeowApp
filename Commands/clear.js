const { EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'clear',
   description: 'Clear queue',
   permissions: '0x0000000000000800',
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue.songs[0]) {
            embed.setDescription('Queue empty')
         } else {
            queue.songs = []
            embed.setDescription('Queue cleared')
         }

         const msg = await interaction.reply({ embeds: [embed] })
         deleteMessage(msg, 10000)
      } catch {
         console.log('❌    Clear Error')
      }
   }
}