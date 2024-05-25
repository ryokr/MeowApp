const { Client, GatewayIntentBits } = require('discord.js')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { DisTube } = require('distube')

const config = require('./config')
const serverStart = require('./host')
const { loadDiscordEvents, loadPlayerEvents, loadCommands } = require('./loader')

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
   emitNewSongOnly: true,
   emitAddSongWhenCreatingQueue: false,
   emitAddListWhenCreatingQueue: false,
   plugins: [new YtDlpPlugin()],
})

const player = client.player

loadDiscordEvents(client)
loadPlayerEvents(player, client)
loadCommands(client)

client.login(config.TOKEN).catch((error) => {
   console.error('❌    LOGIN FAILED', error)
   process.exit(1)
})

serverStart()
