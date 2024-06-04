const { Activity } = require('discord.js')

module.exports = {
   TOKEN: process.env.TOKEN,
   
   ownerID: '677857271530651649',
   guildID: '677858109145874433',
   ownerIcon: 'https://cdn.discordapp.com/avatars/677857271530651649/21fbd6baf54a8f9e82bfe61071b86c79.webp',
   guildIcon: 'https://cdn.discordapp.com/icons/677858109145874433/4629b6907da872a6cb9e539541192a1b.webp',
   supportServer: 'https://discord.gg/fTuGFk9ayG',

   embedColor: 'ff4400',

   activity: {
      name: process.env.NAME || 'Cốn Lào',
      state: 'Meow Meow',
      type: Activity.Watching,
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