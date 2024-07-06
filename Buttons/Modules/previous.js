const { capFirstChar } = require('../../Functions')

module.exports = async (interaction, queue, embed) => {
   await queue.previous().catch(() => {
      embed.setFooter({ text: `🌵 No song`, iconURL: queue.songs[0].user.avatarURL() })
   })
}
