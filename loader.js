const fs = require('fs')

function loadDiscordEvents(client) {
   const path = './events/discord'
   fs.readdir(path, (_err, files) => {
      files.forEach((file) => {
         if (!file.endsWith('.js')) return
         const event = require(`${path}/${file}`)
         let eventName = file.split('.')[0]
         client.on(eventName, event.bind(null, client))
         delete require.cache[require.resolve(`${path}/${file}`)]
      })
   })
}

function loadPlayerEvents(player, client) {
   const path = './events/player'
   fs.readdir(path, (_err, files) => {
      files.forEach((file) => {
         if (!file.endsWith('.js')) return
         const player_events = require(`${path}/${file}`)
         let playerName = file.split('.')[0]
         player.on(playerName, player_events.bind(null, client))
         delete require.cache[require.resolve(`${path}/${file}`)]
      })
   })
}

function loadCommands(client) {
   client.commands = []
   fs.readdir(client.config.commandsDir, (err, files) => {
      if (err) throw err
      files.forEach(async (f) => {
         try {
            if (f.endsWith('.js')) {
               let props = require(`${client.config.commandsDir}/${f}`)
               client.commands.push({
                  name: props.name,
                  description: props.description,
                  options: props.options,
               })
            }
         } catch (err) {
            console.log(err)
         }
      })
   })
}

module.exports = { loadDiscordEvents, loadPlayerEvents, loadCommands }
