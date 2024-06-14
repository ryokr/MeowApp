module.exports = async (client, queue) => {
   queue
      .setVolume(99)
      .setRepeatMode(2)
      .voice.setSelfDeaf(false)
}