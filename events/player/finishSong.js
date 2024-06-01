module.exports = async (client, queue) => {
   try {
      if (queue.lastPlayingMessage != null) {
         await new Promise(resolve => setTimeout(resolve, 100))
         await queue.lastPlayingMessage.delete().catch(() => {})
         queue.lastPlayingMessage = null
      }
   } catch {
      console.log('❌    No Message')
   }
}