const { Client, GatewayIntentBits } = require('discord.js')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { DisTube } = require('distube')

const config = require('./config')
const botInit = require('./init')
const serverStart = require('./host')

if (!config.TOKEN) {
   console.log('❌    TOKEN ERROR')
   process.exit(1)
}

const client = new Client({
   intents: Object.values(GatewayIntentBits),
})

client.config = config
client.player = new DisTube(client, {
   leaveOnStop: config.opt.voiceConfig.leaveOnStop,
   leaveOnFinish: config.opt.voiceConfig.leaveOnFinish,
   leaveOnEmpty: config.opt.voiceConfig.leaveOnEmpty.status,
   emitNewSongOnly: false,
   emitAddSongWhenCreatingQueue: false,
   emitAddListWhenCreatingQueue: false,
   plugins: [new YtDlpPlugin()],
})

botInit(client)

client.login(config.TOKEN).catch(() => {
   console.error('❌    LOGIN FAILED')
   process.exit(1)
})

serverStart()