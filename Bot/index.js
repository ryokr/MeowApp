const { Client, GatewayIntentBits } = require('discord.js')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { DisTube } = require('distube')

const init = require('./init')
const login = require('./login')
const server = require('./server')

module.exports = class MeowBot {
   constructor(config) {
      this.client = new Client({
         intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
      })

      this.client.config = config
      this.client.player = new DisTube(this.client, {
         plugins: [new YtDlpPlugin()],
         leaveOnStop: config.leave,
         leaveOnFinish: config.leave,
         leaveOnEmpty: config.leave,
      })

      init(this.client)
      login(this.client)
      server()
   }
}