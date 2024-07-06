require('dotenv').config()

module.exports = {
   TOKEN: process.env.token,

   presence: {
      status: process.env.status,
      
      name: process.env.name || 'Meow Meow',
      state: process.env.state || 'From Pooba Saga With 💖',
      type: parseInt(process.env.type) || 0,
   },

   player: {
      embedColor: process.env.color || '2F3136',
      embedGif: process.env.gif || 'https://cdn.discordapp.com/attachments/1236634193019277322/1248996386532233248/mikogif.gif?ex=6665b207&is=66646087&hm=e3373b433b6a9ca9b814592f175c4ebfd82c6e10d63348289675a8cba6d04c2c&',
      embedGifGrab: process.env.gifGrab || 'https://cdn.discordapp.com/attachments/1236634193019277322/1256240007169970258/NOW_WITH_MONA.gif?ex=66800c2d&is=667ebaad&hm=99aa0bd08020875ff5e204b6be7de9a2bdfda34b1a46f085cbcf1649a0b29708&',

      dj: process.env.dj || '1227608403166367815',
      guildId: process.env.guildId || '677858109145874433',

      maxVol: parseInt(process.env.maxVol) || 200,
   },

   leave: Boolean(process.env.leave) || false,
   shard: Boolean(process.env.shard) || false,
}