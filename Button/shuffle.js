module.exports = playerShuffle 

async function playerShuffle(queue, embed, username, avatar) {
   await queue.shuffle()
   embed.setFooter({ text: `🌱 • Shuffled • ${username}`, iconURL: avatar })
}