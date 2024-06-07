const { EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'pause',
   description: 'Pause playing',
   permissions: '0x0000000000000800',
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue || !queue.playing) {
            embed.setDescription('No playing music')
         } else if (queue.paused) {
            embed.setDescription('Already paused')
         } else {
            await queue.pause()
            embed.setDescription('Paused')
         }

         const msg = await interaction.reply({ embeds: [embed] })
         deleteMessage(msg, 10000)
      } catch (e) {
         console.log('❌    Pause Error')
      }
   }
}