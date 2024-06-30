const { deleteMessage, createGuild } = require('../Function')

module.exports = {
   name: 'create',
   description: 'Meow',
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      if(interaction.user.id !== '677857271530651649')
         return deleteMessage(await interaction.reply({content: 'Im Sleeping'}), 1000)
      
      try {
         interaction.deferReply()

         const res = await createGuild(client.config.TOKEN)

         deleteMessage(await interaction.editReply({content: res}), 10000)
      } catch (e) {
         interaction.deleteReply()
         console.log('❌   Create Error\n' ,e)
      }
   }
}
