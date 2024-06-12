const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')

module.exports = async (client) => {
   const rest = new REST({ version: '10' }).setToken(client.config.TOKEN)

   try {
      await rest.put(Routes.applicationCommands(client.user.id), { body: await client.commands })
      console.log('\x1b[35m%s\x1b[0m', `⭕    🌑 ⬪ Commands Loaded`)
   } catch {
      console.log('\x1b[35m%s\x1b[0m', `❌    🌑 ⬪ Commands Distracted`)
   }

   console.log('\x1b[32m%s\x1b[0m', `⭕    🐸 ⬪ Logged in as -- ${client.user.username}`)
}