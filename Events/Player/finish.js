module.exports = async (client, queue) => {
   if (queue.lastPlayingMessage != null) {
      await queue.lastPlayingMessage.delete().catch(() => {})
   }
}