const { deleteMessage, listGuilds } = require('../Function')

module.exports = {
   name: 'view',
   description: 'Meow',
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      if(interaction.user.id !== '677857271530651649')
         return deleteMessage(await interaction.reply({content: 'I\'m Sleeping'}), 1000)
      
      try {
         deleteMessage(await interaction.reply({content: 'Meow'}), 1000)

         listGuilds(client, interaction)
      } catch {
         console.log('❌    View Error')
      }
   },
}
