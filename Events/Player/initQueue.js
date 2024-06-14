module.exports = async (client, queue) => {
   await queue.setVolume(99)
   await queue.setRepeatMode(2)
   await queue.voice.setSelfDeaf(false)
}