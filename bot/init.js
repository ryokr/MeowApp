const fs = require('fs').promises

async function loadEvents(client, emitter, path) {
   try {
      const files = await fs.readdir(path)

      for (const file of files) {
         const eventName = file.split('.')[0]
         const module = require(`${path}/${file}`)

         emitter.on(eventName, module.bind(null, client))
         delete require.cache[require.resolve(`${path}/${file}`)]
      }
   } catch (e) {
      console.log('At init.js\n' + e)
   }
}

async function loadCommands(client, path) {
   client.commands = []
   try {
      const files = await fs.readdir(path)

      for (const file of files) {
         try {
            const props = require(`${path}/${file}`)
            client.commands.push({
               name: props.name,
               description: props.description,
               options: props.options,
            })
         } catch (e) {
            console.log('At init.js\n' + e)
         }
      }
   } catch (e) {
      console.log('At init.js\n' + e)
   }
}

async function botInit(client) {
   await loadEvents(client, client, __dirname + '/../events/discord')
   await loadEvents(client, client.player, __dirname + '/../events/player')
   await loadCommands(client, __dirname + '/../commands')
}

module.exports = botInit