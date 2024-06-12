const fs = require('fs').promises

module.exports = botInit = async (client) => {
   await loadEvents(client, client, __dirname + '/../Events/Discord')
   await loadEvents(client, client.player, __dirname + '/../Events/Player')
   await loadCommands(client, __dirname + '/../Commands')
}

const loadEvents = async (client, emitter, path) => {
   try {
      const files = await fs.readdir(path)

      for (const file of files) {
         const eventName = file.split('.')[0]
         const module = require(`${path}/${file}`)

         emitter.on(eventName, module.bind(null, client))
         delete require.cache[require.resolve(`${path}/${file}`)]
      }
   } catch (e) {
      console.log(e)
      process.exit(1)
   }
}

const loadCommands = async (client, path) => {
   client.commands = []
   try {
      const files = await fs.readdir(path)

      for (const file of files) {
         const props = require(`${path}/${file}`)
         client.commands.push({
            name: props.name,
            description: props.description,
            options: props.options,
         })
      }
   } catch (e) {
      console.log(e)
      process.exit(1)
   }
}