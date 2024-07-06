const { capFirstChar } = require('../Functions')

module.exports = {
   name: 'playerPrev',
   run: async (interaction, client, queue, embed) => {
      await queue.previous().catch(() => {
         embed.setFooter({ text: `🌵 No song`, iconURL: queue.songs[0].user.avatarURL() })
      })
   }
}