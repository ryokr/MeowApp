module.exports = playerPrevious

async function playerPrevious(queue, embed, username, avatar) {
   await queue.previous().catch(() => {
      embed.setFooter({ text: `🌵 • No song • ${username}`, iconURL: avatar })
   })
}