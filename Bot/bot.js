const { Client, GatewayIntentBits } = require('discord.js')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { DisTube } = require('distube')

const config = require('../config')
const botInit = require('./init')
const serverStart = require('./server')

if (!config.TOKEN) {
   console.log('❌    TOKEN ERROR')
   process.exit(1)
}

const client = new Client({ intents: Object.values(GatewayIntentBits) })

client.config = config
client.player = new DisTube(client, {
   leaveOnStop: config.voice.leaveOnStop,
   leaveOnFinish: config.voice.leaveOnFinish,
   leaveOnEmpty: config.voice.leaveOnEmpty.status,
   plugins: [new YtDlpPlugin()],
})

botInit(client)

client.login(config.TOKEN).catch(() => {
   console.log('❌    LOGIN FAILED')
   process.exit(1)
})

serverStart()