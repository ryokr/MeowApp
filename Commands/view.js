const { deleteMessage, listGuilds } = require('../Function')

module.exports = {
   name: 'view',
   description: 'Meow',
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      try {
         deleteMessage(await interaction.reply({content: 'Meow'}), 1000)

         listGuilds(client, interaction)
      } catch {
         console.log('❌    View Error')
      }
   },
}
