module.exports = async (client, oldState, newState) => {
   const queue = client.player.getQueue(oldState.guild.id)

   if (!queue || !queue.playing) return

   const { leaveOnEmpty } = client.config.voice

   if (leaveOnEmpty.status) {
      setTimeout(async () => {
         const botChannel = oldState.guild.channels.cache.get(queue.voice.connection.joinConfig.channelId)

         if (botChannel && botChannel.id === oldState.channelId) {
            const botMember = botChannel.members.get(client.user.id)

            if (botMember && botChannel.members.size === 1) {
               try {
                  await queue.textChannel.send({ content: 'Users left channel' })
               } catch (e) {
                  console.log('❌    Failed to send message\n', e)
               }

               if (queue && queue.playing) {
                  queue.stop(oldState.guild.id)
               }
            }
         }
      }, leaveOnEmpty.cooldown || 1000)
   }

   if (newState.id === client.user.id) {
      const wasMuted = oldState.serverMute
      const isMuted = newState.serverMute

      if (wasMuted !== isMuted) {
         try {
            if (isMuted) {
               await queue.pause()
            } else {
               await queue.resume()
            }
         } catch {
            console.log('❌    Queue state error')
         }
      }
   }
}