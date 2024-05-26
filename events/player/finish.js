module.exports = async (client, queue) => {
   if (queue) {
      if (queue.textChannel && queue.lastPlayingMessage) {
         queue.lastPlayingMessage.delete().catch((e) => console.log(e))
      }
   }
}