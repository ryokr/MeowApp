module.exports = playerSkip

async function playerSkip(queue, embed, username, avatar) {
   await queue.skip().catch(() => {
      embed.setFooter({ text: `🥑 • No song • ${username}`, iconURL: avatar })
   })
}