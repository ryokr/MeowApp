module.exports = playerLoop

async function playerLoop(queue, embed, username, avatar) {
   await queue.setRepeatMode(queue.repeatMode === 2 ? 0 : queue.repeatMode + 1)
   const loopMode = ['Loop off', 'Loop track', 'Loop queue']
   embed.setFooter({ text: `🥝 • ${loopMode[queue.repeatMode]} • ${username}`, iconURL: avatar })
}
