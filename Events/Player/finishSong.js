module.exports = async (client, queue) => {
   try {
      if (queue.lastPlayingMessage != null) {
         await queue.lastPlayingMessage.delete()
         queue.lastPlayingMessage = null
      }
   } catch {}
}