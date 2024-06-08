const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'volume',
   description: 'Adjust volume',
   permissions: '0x0000000000000800',
   voiceChannel: true,
   options: [
      {
         name: 'volume',
         description: 'Type a number',
         type: ApplicationCommandOptionType.Integer,
         required: true,
      },
   ],

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)
         const maxVol = client.config.voice.maxVol
         const vol = interaction.options.getInteger('volume')

         if (!queue || !queue.playing) {
            embed.setDescription('No music playing')
         } else if (queue.volume === vol) {
            embed.setDescription(`Volume is already set to ${vol}`)
         } else if (!vol || vol < 1 || vol > maxVol) {
            embed.setDescription(`Type a number between 1 and ${maxVol}`)
         } else {
            await queue.setVolume(vol)
            embed.setDescription(`Set the volume to ${vol}`)
         }

         deleteMessage(await interaction.reply({ embeds: [embed] }), 10000)
      } catch {
         console.log('❌    Set Volume Error')
      }
   }
}