module.exports = async (client, queue) => {
   try {
      if (queue.lastPlayingMessage != null) {
         queue.lastPlayingMessage.delete().catch((e) => console.log('❌    Finish Play'))
         queue.lastPlayingMessage = null
      }
   } catch (e) {
      console.log('❌    No Message')
   }
}
