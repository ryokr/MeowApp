const { InteractionType } = require('discord.js')
const { handleCommand, handleModalSubmit } = require('../../Function')

module.exports = async (client, interaction) => {
   try {
      if (!interaction.guild) {
         await interaction.reply({ content: 'Join voice channel', ephemeral: true })
         return
      }

      if (interaction.type === InteractionType.ApplicationCommand) {
         await handleCommand(client, interaction)
      }

      if (interaction.isModalSubmit()) {
         await handleModalSubmit(client, interaction)
      }
   } catch (e) {
      console.error('❌ Error\n', e)
   }
}