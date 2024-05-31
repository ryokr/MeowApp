module.exports = async (client, queue) => {
   try {
      if (queue.lastPlayingMessage != null) {
         queue.lastPlayingMessage.delete().catch((e) => console.log('❌    Disconnected'))
         queue.lastPlayingMessage = null
      }
   } catch {
      console.log('❌    No Message')
   }
}
