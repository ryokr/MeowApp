module.exports = async (client) => {
   client.login(client.config.TOKEN).catch(() => {
      console.log('❌   💔 ⬪ PLEASE PROVIDE A VALID TOKEN')
      process.exit(1)
   })
   
   setInterval(() => client.user.setPresence({
      status: client.config.presence.status || Math.random() < 0.7 ? 'online' : 'idle', 
      activities: [
         {
            name: 'Pooba Saga 🌸',
            state: 'From Pooba Saga With 💖',
            type: 2,
         },
         {
            name: client.config.presence.name,
            state: client.config.presence.state,
            type: client.config.presence.type,
         },
      ],
   }), 24000)
}