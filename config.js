module.exports = {
   TOKEN: process.env.TOKEN,
   ownerID: '677857271530651649',
   guildID: '677858109145874433',
   ownerIcon: 'https://cdn.discordapp.com/avatars/677857271530651649/21fbd6baf54a8f9e82bfe61071b86c79.webp',
   guildIcon: 'https://cdn.discordapp.com/icons/677858109145874433/4629b6907da872a6cb9e539541192a1b.webp',
   supportServer: 'https://discord.gg/fTuGFk9ayG',

   commandsDir: './commands',
   embedColor: 'ff4400',

   activity: {
      name: 'Meow',
      state: 'Meow Meow',
      type: 'Playing',
   },

   opt: {
      maxVol: 100,

      voiceConfig: {
         leaveOnFinish: false,
         leaveOnStop: false,
         leaveOnEmpty: {
            status: false,
            cooldown: 10,
         },
      },

      currentMessage: null,
   },

   shardManager: {
      shardStatus: false,
   },
}
