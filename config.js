require('dotenv').config()

module.exports = {
   TOKEN: process.env.token,

   presence: {
      status: process.env.status,
      activities: [
         {
            name: process.env.name || 'Meow Meow',
            state: process.env.state || 'From Pooba Saga With 💖',
            type: parseInt(process.env.type) || 0, // 0_Play, 1_Stream, 2_Listen, 3_Watch, 4_Custom, 5_Compete
         },
         {
            name: 'Pooba Saga 🌸',
            state: 'From Pooba Saga With 💖',
            type: 2,
         },
      ],
   },

   player: {
      embedColor: process.env.color || 'ff4400',
      embedGif: process.env.gif || 'https://cdn.discordapp.com/attachments/1236634193019277322/1248996386532233248/mikogif.gif?ex=6665b207&is=66646087&hm=e3373b433b6a9ca9b814592f175c4ebfd82c6e10d63348289675a8cba6d04c2c&',
      embedGifGrab: 'https://cdn.discordapp.com/attachments/1236634193019277322/1256240007169970258/NOW_WITH_MONA.gif?ex=66800c2d&is=667ebaad&hm=99aa0bd08020875ff5e204b6be7de9a2bdfda34b1a46f085cbcf1649a0b29708&',

      maxVol: parseInt(process.env.maxvol) || 200,
      dj: process.env.dj || '1256261739021074564',
      guildId: process.env.guild || '677858109145874433',
   },

   leave: Boolean(process.env.leave) || false,
   shard: Boolean(process.env.shard) || false,
}