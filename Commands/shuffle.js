const { EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'shuffle',
   description: 'Shuffle the queue',
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue || !queue.playing) {
            embed.setDescription('No music playing')
         } else {
            await queue.shuffle()
            embed.setDescription('Queue shuffled')
         }

         const msg = await interaction.reply({ embeds: [embed] })
         deleteMessage(msg, 10000)
      } catch {
         console.log('❌    Shuffle Error')
      }
   }
}