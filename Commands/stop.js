module.exports = {
   name: 'stop',
   description: 'Stop the music',
   permissions: '0x0000000000000800',
   options: [],
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)

         if (!queue || !queue.playing) {
            return interaction.reply({ content: 'No music playing', ephemeral: true })
         }

         await queue.stop()

         const { EmbedBuilder } = require('discord.js')

         const embed = new EmbedBuilder().setColor(client.config.player.embedColor).setAuthor({
            name: 'Music Stopped',
            iconURL:
               'https://cdn.discordapp.com/attachments/1156866389819281418/1157305318255116400/pngtree-vector-stop-icon-png-image_4233262.jpg?ex=65182011&is=6516ce91&hm=d5a8ca6010716bae836b025f8d36557a95f14c13a705f65eb09a54161649c795&',
         })
         //.setDescription('')

         const msg = await interaction.reply({ embeds: [embed] }).catch((e) => {})

         setTimeout(async () => {
            if (msg) {
               await msg.delete().catch((e) => {})
            }
         }, 5000)
      } catch (e) {
         console.error(e)
      }
   },
}
