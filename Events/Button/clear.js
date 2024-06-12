module.exports = async (queue, embed, username, avatar) => {
   if (queue.songs.length > 1) {
      queue.songs = []
      embed.setFooter({ text: `💽 • Queue cleared • ${username}`, iconURL: avatar })
   } else {
      embed.setFooter({ text: `💽 • Queue empty • ${username}`, iconURL: avatar })
   }
}