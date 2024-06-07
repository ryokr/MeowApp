const { EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'previous',
   description: 'Play previous music',
   permissions: '0x0000000000000800',
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue || !queue.playing) {
            embed.setDescription('No music playing')
         } else {
            try {
               await queue.previous()
               embed.setDescription('Play previous track')
            } catch {
               embed.setDescription('No previous track')
            }
         }

         const msg = await interaction.reply({ embeds: [embed] })
         deleteMessage(msg, 10000)
      } catch {
         console.log('❌    Previous Error')
      }
   }
}