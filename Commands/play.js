const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { playMusic, deleteMessage } = require('../Functions')

module.exports = {
   name: 'play',
   description: 'Play music',
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
         await interaction.deferReply()
         const name = interaction.options.getString('name')
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor).setDescription('Meowing')
         const msg = await interaction.editReply({ embeds: [embed] })

         try {
            await playMusic(client, interaction, name)
            deleteMessage(msg, 1000)
         } catch {
            embed.setDescription('Not found')
            await interaction.editReply({ embeds: [embed] })
            deleteMessage(msg, 5000)
         }
      } catch {
         console.log('❌    Play Error')
      }
   }
}