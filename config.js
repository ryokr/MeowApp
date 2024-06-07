const { Activity } = require('discord.js')

module.exports = {
   TOKEN: process.env.token,

   ownerID: '677857271530651649',
   guildID: '677858109145874433',
   ownerIcon: 'https://cdn.discordapp.com/avatars/677857271530651649/21fbd6baf54a8f9e82bfe61071b86c79.webp',
   guildIcon: 'https://cdn.discordapp.com/icons/677858109145874433/4629b6907da872a6cb9e539541192a1b.webp',
   supportServer: 'https://discord.gg/fTuGFk9ayG',

   player: {
      embedColor: process.env.color || 'ff4400',
      thumbnail: 'https://cdn.discordapp.com/attachments/1236634193019277322/1248724431514107945/yae245345345.png?ex=6664b4c0&is=66636340&hm=5ea3e8201adeb546ccd1dbd6730c5bfe03c0bd4c5b31f31e60b8bf9f238cf3c1&',
      image: 'https://cdn.discordapp.com/attachments/1236634193019277322/1248307544804294666/electro.jpg?ex=6663307f&is=6661deff&hm=c5ba2c34127bcfc34aeb1acd9fbb4a2d0e0300b4d8f20915d42d87f531cfc8dc&',
   },

   activity: {
      name: process.env.name || 'Meow',
      state: process.env.state || 'Meow Meow',
      type: process.env.type === 'Watching' ? Activity.Watching : Activity.Playing,
   },

   voice: {
      maxVol: 100,

      leaveOnFinish: false,
      leaveOnStop: false,
      leaveOnEmpty: {
         status: false,
         cooldown: 10,
      },
   },

   shardManager: {
      shardStatus: false,
   },
}