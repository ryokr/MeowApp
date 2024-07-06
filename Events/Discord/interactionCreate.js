const { handleCommand, handleModalSubmit } = require('../../Functions')
const { InteractionType } = require('discord.js')

module.exports = async (client, interaction) => {
   try {
      if (!interaction.guild) {
         return await interaction.reply({ content: 'Join voice channel in a Server', ephemeral: true })
      }

      if (interaction.type === InteractionType.ApplicationCommand) {
         await handleCommand(client, interaction)
      } else if (interaction.type === InteractionType.ModalSubmit) {
         await handleModalSubmit(client, interaction)
      }
   } catch (e) {
      console.error('❌    Interaction Erorr\n', e)
   }
}