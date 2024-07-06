module.exports = {
   name: 'playerStop',
   run: async (interaction, client, queue, embed) => {
      try {
         await queue.stop()
         await queue.lastPlayingMessage.delete()
      } catch {}
   }
}