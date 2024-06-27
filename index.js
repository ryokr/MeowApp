const config = require('./config')

if (config.shard.status) {
   const { ShardingManager } = require('discord.js')
   const manager = new ShardingManager('./Bot', { token: config.TOKEN, totalShards: 'auto' })
   manager.on('shardCreate', shard => console.log('\x1b[34m%s\x1b[0m', `⭕    ❤️‍🔥 ⬪ Launched shard ${shard.id}`))
   manager.spawn()
} else {
   require('./Bot')
}