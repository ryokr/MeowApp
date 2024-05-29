module.exports = async (client, queue) => {
   try {
      if ( queue.lastPlayingMessage != null) {
          queue.lastPlayingMessage.delete().catch((e) => console.log('D\n' + e))
          queue.lastPlayingMessage = null
      }
   } catch {
      console.log('D\n' + e)
   }
}
