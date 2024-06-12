const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { playMusic, deleteMessage } = require('../Function')

module.exports = {
   name: 'play',
   description: 'Play music',
   permissions: '0x0000000000000800',
   voiceChannel: true,
   options: [
      {
         name: 'name',
         description: 'Type music name or link',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],

   run: async (client, interaction) => {
      try {
         const name = interaction.options.getString('name')
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!name) {
            embed.setDescription('Please type music name or link')
            const msg = await interaction.reply({ embeds: [embed] })
            deleteMessage(msg, 20000)
         } else {
            embed.setDescription('Meowing')
            const msg = await interaction.reply({ embeds: [embed] })

            try {
               await playMusic(client, interaction, name)
            } catch {
               embed.setDescription('Not found')
               await interaction.editReply({ embeds: [embed] })
            }

            deleteMessage(msg, 10000)
         }
      } catch {
         console.log('❌    Play Error')
      }
   }
}