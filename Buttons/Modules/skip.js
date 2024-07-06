const { capFirstChar } = require('../../Functions')

module.exports = async (interaction, queue, embed) => {
   await queue.skip().catch(() => {
      embed.setFooter({ text: `🥙 No song`, iconURL: queue.songs[0].user.avatarURL() })
   })
}
