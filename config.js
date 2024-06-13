require('dotenv').config()

module.exports = {
   TOKEN: process.env.token,

   player: {
      embedColor: process.env.color || 'ff4400',
      gif: process.env.gif || 'https://cdn.discordapp.com/attachments/1236634193019277322/1248996386532233248/mikogif.gif?ex=6665b207&is=66646087&hm=e3373b433b6a9ca9b814592f175c4ebfd82c6e10d63348289675a8cba6d04c2c&',
   },

   // 0-Play, 1-Stream, 2-Listen, 3-Watch 4-Custom 5-Compete
   activity: {
      name: process.env.name || 'Meow Meow',
      state: process.env.state || 'From Pooba Saga With 💖',
      type: parseInt(process.env.type) || 0,
   },

   voice: {
      maxVol: 200,

      leaveOnStop: process.env.leave || false,
      leaveOnFinish: process.env.leave || false,
      leaveOnEmpty: {
         status: process.env.leave || false,
         cooldown: 4,
      },
   },

   shardManager: {
      shardStatus:  process.env.shard || true,
   }
}