const { capFirstChar } = require('../Functions')

module.exports = {
   name: 'playerShuf',
   run: async (interaction, client, queue, embed) => {
      await queue.shuffle()
      embed.setFooter({
         text: `🌱 Shuffled by ${capFirstChar(interaction.user.globalName)}`,
         iconURL: interaction.user.avatarURL(),
      })
   }
}