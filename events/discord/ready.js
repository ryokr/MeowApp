module.exports = async (client) => {
   const { REST } = require('@discordjs/rest')
   const { Routes } = require('discord-api-types/v10')
   const rest = new REST({ version: '10' }).setToken(client.config.TOKEN)

   try {
      await rest.put(Routes.applicationCommands(client.user.id), { body: await client.commands })
      console.log('\x1b[35m%s\x1b[0m', `⭕    🌑 ⬪ Commands Loaded`)
   } catch (e) {
      console.log('\x1b[35m%s\x1b[0m', `❌    🌑 ⬪ Commands Distracted`)
   }

   console.log('\x1b[32m%s\x1b[0m', `⭕    🐸 ⬪ Logged in as -- ${client.user.username}`)

   setInterval(() => {
      client.user.setActivity({
         name: client.config.activity.name,
         state: client.config.activity.state,
         type: client.config.activity.type,
      })
   }, 10000)

   // const statuses = [
   //    { name: "Never Gonna Give You Up", state: 'Woah, so high', type: ActivityType.Listening },
   //    { name: `Pussy C̶̶a̶̶t̶`, state: 'Mlem Mlem', type: ActivityType.Watching },
   // ]

   // setInterval(() => {
   //    var randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
   //    client.user.setActivity(randomStatus)
   // }, 10000)
}