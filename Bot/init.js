const { Collection } = require('discord.js')
const fs = require('fs').promises

module.exports = async (client) => {
   await loadCommands(client, __dirname + '/../Commands')
   await loadEvents(client, client, __dirname + '/../Events/Discord')
   await loadEvents(client, client.player, __dirname + '/../Events/Player')
}

const loadCommands = async (client, path) => {
   client.commands = new Collection()
   client.reloads = []
   
   try {
      const files = await fs.readdir(path)

      for (const file of files) {
         const command = require(`${path}/${file}`)

         client.commands.set(command.name, command)
         client.reloads.push({
            name: command.name,
            description: command.description,
            options: command.options,
         })
      }
   } catch (e) {
      console.log(e)
      process.exit(1)
   }
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

const loadButtons = async (client, path) => {
   client.buttons = new Collection()
   
   try {
      const files = await fs.readdir(path)

      for (const file of files) {
         const buttonName = file.split('.')[0]
         const module = require(`${path}/${file}`)

         client.buttons.set(buttonName, module)
         delete require.cache[require.resolve(`${path}/${file}`)]
      }
   } catch (e) {
      console.log(e)
      process.exit(1)
   }
}