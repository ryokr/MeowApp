const { capFirstChar } = require('../Functions')

module.exports = {
   name: 'playerSkip',
   run: async (interaction, client, queue, embed) => {
      await queue.skip().catch(() => {
         embed.setFooter({ text: `🥙 No song`, iconURL: queue.songs[0].user.avatarURL() })
      })
   }
}