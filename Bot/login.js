const { getStatus } = require('../Function')

module.exports = login = async (client) => {
   client.login(client.config.TOKEN).catch(() => {
      console.log('❌    LOGIN FAILED')
      process.exit(1)
   })
   
   setInterval(() => client.user.setPresence({
      status: client.config.presence.status || getStatus(), 
      activities: client.config.presence.activities
   }), 24000)
}