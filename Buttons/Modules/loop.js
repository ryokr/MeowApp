const { capFirstChar } = require('../../Functions')

module.exports = async (interaction, queue, embed) => {
   await queue.setRepeatMode(queue.repeatMode === 2 ? 0 : queue.repeatMode + 1)
   const loopMode = ['Loop off', 'Loop track', 'Loop queue']
   embed.setFooter({
      text: `🍍 ${loopMode[queue.repeatMode]} by ${capFirstChar(interaction.user.globalName)}`,
      iconURL: interaction.user.avatarURL()
   })
}