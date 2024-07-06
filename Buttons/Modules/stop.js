module.exports = async (queue) => {
   try {
      await queue.stop()
      await queue.lastPlayingMessage.delete()
   } catch {}
}