module.exports = async (queue, song, listener, currentMessage) => {
   try {
      if (queue.songs[0].url === song.url) {
         await queue.stop()
         await listener.stop()
         await currentMessage.delete()
      } else {
         await listener.stop()
         await currentMessage.delete()
      }
   } catch {}
}