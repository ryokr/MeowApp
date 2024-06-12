module.exports = async (queue, embed, username, avatar) => {
   await queue.shuffle()
   embed.setFooter({ text: `🌱 • Shuffled • ${username}`, iconURL: avatar })
}