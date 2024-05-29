module.exports = async (client, queue) => {
   try {
      if (queue.lastPlayingMessage != null) {
         await new Promise((resolve) => setTimeout(resolve, 2000))

         queue.lastPlayingMessage.delete().catch((e) => console.log('FS\n' + e))
         queue.lastPlayingMessage = null
      }
   } catch (e) {
      console.log('FS\n' + e)
   }
}
