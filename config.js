module.exports = {
   TOKEN: process.env.TOKEN,
   ownerID: ["", ""],
   botInvite: "",
   supportServer: "",
   mongodbURL: "mongodb+srv://shiva:shiva@musicbotyt.ouljywv.mongodb.net/?retryWrites=true&w=majority",
   status: 'Ryo',
   commandsDir: './commands',
   language: "en",
   embedColor: "ff4400",
   errorLog: "",

   sponsor: {
      status: false,
      url: "",
   },

   voteManager: {
      status: false,
      api_key: "",
      vote_commands: ["back", "channel", "clear", "dj", "filter", "loop", "nowplaying", "pause", "playnormal", "playlist", "queue", "resume", "save", "play", "skip", "stop", "time", "volume"],
      vote_url: "",
   },

   shardManager: {
      shardStatus: false
   },

   playlistSettings: {
      maxPlaylist: 1000,
      maxMusic: 24000,
   },

   opt: {
      DJ: {
         commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume', 'shuffle']
      },

      voiceConfig: {
         leaveOnFinish: false,
         leaveOnStop: false,
         leaveOnEmpty: {
            status: false,
            cooldown: 10000000,
         },

      },

      maxVol: 150,

   }
}