module.exports = async (client, queue) => {
   try {
      if (queue.lastPlayingMessage != null) {
         await queue.lastPlayingMessage.delete().catch(() => {})
      }
   } catch {
      console.log('❌    No Message')
   }
}