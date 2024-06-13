module.exports = async (queue, song, collector, currentMessage) => {
   try {
      if (queue.songs[0].url === song.url) {
         await queue.stop()
         await collector.stop()
         await currentMessage.delete()
      } else {
         await collector.stop()
         await currentMessage.delete()
      }
   } catch (e) {
      console.log(e)
   }
}