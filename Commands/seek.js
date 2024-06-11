const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { getSecond, deleteMessage } = require('../Function')

module.exports = {
   name: 'seek',
   description: 'Jump to the timestamp',
   permissions: '0x0000000000000800',
   voiceChannel: true,
   options: [
      {
         name: 'time',
         description: 'Example: 2h 30m 2s',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)
         const position = getSecond(interaction.options.getString('time'))

         if (!queue || !queue.playing) {
            embed.setDescription('No music playing')
         } else if (isNaN(position)) {
            embed.setDescription('Usage: 2h 3m 4s')
         } else {
            await queue.seek(position)
            embed.setDescription(`Seeked to ${interaction.options.getString('time')}`)
         }

         const msg = await interaction.reply({ embeds: [embed] })
         deleteMessage(msg, 10000)
      } catch (error) {
         console.log('❌    Seek Error')
      }
   }
}