module.exports = async (client, queue) => {
   try {
      if (queue.lastPlayingMessage != null) {
         queue.lastPlayingMessage.delete().catch((e) => console.log('F\n' + e))
         queue.lastPlayingMessage = null
      }
   } catch (e) {
      console.log('F\n' + e)
   }
}
