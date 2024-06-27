module.exports = async (client, queue) => {
   await queue.voice.setSelfDeaf(false)
   await queue.setRepeatMode(2)
   await queue.setVolume(100)
}