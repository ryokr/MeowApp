const { capFirstChar } = require('../../Functions')

module.exports = async (interaction, queue, embed) => {
   await queue.shuffle()
   embed.setFooter({
      text: `🌱 Shuffled by ${capFirstChar(interaction.user.globalName)}`,
      iconURL: interaction.user.avatarURL()
   })
}