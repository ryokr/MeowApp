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
   } catch (err) {
      console.log(err)
   }
}

async function loadCommands(client) {
   client.commands = []
   try {
      const files = await fs.readdir(client.config.commandsDir)

      for (const file of files) {
         try {
            const props = require(`${client.config.commandsDir}/${file}`)
            client.commands.push({
               name: props.name,
               description: props.description,
               options: props.options,
            })
         } catch (err) {
            console.log(err)
         }
      }

      client.player.on('initQueue', (queue) => {
         queue.setVolume(client.config.opt.maxVol - 1)
      })
   } catch (err) {
      console.log(err)
   }
}

async function botInit(client) {
   await loadEvents(client, client, './events/discord')
   await loadEvents(client, client.player, './events/player')
   await loadCommands(client)
}

module.exports = botInit