const { capFirstChar } = require('../../Functions')

module.exports = async (interaction, queue, embed) => {
   if (queue.songs.length > 1) queue.songs = []
   
   embed.setFooter({
      text: `🌸 Queue cleared by ${capFirstChar(interaction.user.globalName)}`,
      iconURL: interaction.user.avatarURL()
   })
}