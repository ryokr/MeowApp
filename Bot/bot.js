const { Client, GatewayIntentBits } = require('discord.js')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { DisTube } = require('distube')

const config = require('../config')
const botInit = require('./init')
const login = require('./login')
const serverStart = require('./server')

if (!config.TOKEN) {
   console.log('❌    PLEASE PROVIDE A VALID TOKEN')
   process.exit(1)
}

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
   ],
})

client.config = config
client.player = new DisTube(client, {
   leaveOnStop: config.voice.leaveOnStop,
   leaveOnFinish: config.voice.leaveOnFinish,
   leaveOnEmpty: config.voice.leaveOnEmpty,
   plugins: [new YtDlpPlugin()],
})

botInit(client)
login(client)
serverStart()