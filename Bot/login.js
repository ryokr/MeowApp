module.exports = login = async (client) => {
   client.login(client.config.TOKEN).catch(() => {
      console.log('❌    LOGIN FAILED')
      process.exit(1)
   })
   
   setInterval(() => client.user.setPresence(client.config.presence), 24100)
}