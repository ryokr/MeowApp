require('dotenv').config()

module.exports = {
   TOKEN: process.env.token,

   support: 'https://discord.gg/fTuGFk9ayG',

   player: {
      embedColor: process.env.color || 'ff4400',
      gif: process.env.gif || 'https://cdn.discordapp.com/attachments/1236634193019277322/1248996386532233248/mikogif.gif?ex=6665b207&is=66646087&hm=e3373b433b6a9ca9b814592f175c4ebfd82c6e10d63348289675a8cba6d04c2c&',
      image: process.env.image || 'https://cdn.discordapp.com/attachments/1236634193019277322/1248307544804294666/electro.jpg?ex=6663307f&is=6661deff&hm=c5ba2c34127bcfc34aeb1acd9fbb4a2d0e0300b4d8f20915d42d87f531cfc8dc&',
   },

   // 0-Playing, 1-Streaming, 2-Listening, 3-Watching 4-Custom 5-Competing
   activity: {
      name: process.env.name || 'Meow Meow',
      state: process.env.state || 'From Pooba Saga With 💖',
      type: parseInt(process.env.type) || 0,
   },

   voice: {
      maxVol: 100,

      leaveOnFinish: process.env.leave || false,
      leaveOnStop: process.env.leave || false,
      leaveOnEmpty: {
         status: process.env.leave || false,
         cooldown: 4,
      },
   },

   shardManager: {
      shardStatus:  process.env.shard || false,
   },
}