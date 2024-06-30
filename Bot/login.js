module.exports = async (client) => {
   client.login(client.config.TOKEN).catch(() => {
      console.log('❌   💔 ⬪ PLEASE PROVIDE A VALID TOKEN')
      process.exit(1)
   })
   
   setInterval(() => client.user.setPresence({
      status: client.config.presence.status || Math.random() < 0.7 ? 'online' : 'idle', 
      activities: client.config.presence.activities
   }), 24000)
}