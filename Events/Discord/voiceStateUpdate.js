module.exports = async (client, oldState, newState) => {
   const queue = client.player.getQueue(oldState.guild.id)
   if (!queue || !queue.playing) return

   if (client.config.voice.leaveOnEmpty.status) {
      setTimeout(async () => {
         const botChannel = oldState.guild.channels.cache.get(queue.voice.connection.joinConfig.channelId)

         if (botChannel && botChannel.id === oldState.channelId) {
            if (botChannel.members.get(client.user.id) && botChannel.members.size === 1) {
               await queue.textChannel.send({ content: 'Users left channel' }).catch(() => {})
               if (queue && queue.playing) queue.stop(oldState.guild.id)
            }
         }
      }, client.config.voice.leaveOnEmpty.cooldown * 1000 || 10000)
   }
}