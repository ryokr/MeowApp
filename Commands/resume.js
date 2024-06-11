const { EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'resume',
   description: 'Resume music.',
   permissions: '0x0000000000000800',
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue || !queue.playing) {
            embed.setDescription('No music playing')
         } else if (!queue.paused) {
            embed.setDescription('Already playing')
         } else {
            await queue.resume()
            embed.setDescription('Resumed')
         }

         const msg = await interaction.reply({ embeds: [embed] })
         deleteMessage(msg, 10000)
      } catch (e) {
         console.log('❌    Resume Error')
      }
   }
}