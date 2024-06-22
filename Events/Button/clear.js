module.exports = async (queue, embed, username, avatar) => {
   if (queue.songs.length > 1) {
      queue.songs = []
      embed.setFooter({ text: `💽 • Queue Cleared • ${username}`, iconURL: avatar })
   } else {
      embed.setFooter({ text: `💽 • Queue Empty • ${username}`, iconURL: avatar })
   }
}