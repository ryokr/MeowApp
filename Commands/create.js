const { deleteMessage, createGuild } = require('../Function')

module.exports = {
   name: 'create',
   description: 'Meow',
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      try {
         interaction.deferReply()

         const res = await createGuild(client.config.TOKEN)

         deleteMessage(await interaction.editReply({content: res}), 10000)
      } catch {
         interaction.deleteReply()
         console.log('❌    Create Error')
      }
   }
}
