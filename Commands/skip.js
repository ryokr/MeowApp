const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'skip',
   description: 'Skip song',
   voiceChannel: true,
   options: [
      {
         name: 'number',
         description: 'Amount to skip',
         type: ApplicationCommandOptionType.Number,
         required: false,
      },
   ],

   run: async (client, interaction) => {
      try {
         const number = interaction.options.getNumber('number')
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue || !queue.playing) {
            embed.setDescription('No music is currently playing')
         } else if (number) {
            if (number > queue.songs.length) embed.setDescription('Exceeded current no of songs')
            if (isNaN(number) || number < 1) embed.setDescription('Invalid Number')

            try {
               await client.player.jump(interaction, number)
               embed.setDescription(`Skipped ${number} songs`)
            } catch {
               embed.setDescription('No songs to skip')
            }
         } else {
            try {
               embed.setDescription(`Skipped [${queue.songs[0].name}](${queue.songs[0].url})`)
               await queue.skip()
            } catch {
               embed.setDescription('No song to skip')
            }
         }

         deleteMessage(await interaction.reply({ embeds: [embed] }), 10000)
      } catch {
         console.log('❌    Skip Error')
      }
   }
}