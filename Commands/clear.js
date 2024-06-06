module.exports = {
   name: 'clear',
   description: 'Clear queue',
   permissions: '0x0000000000000800',
   options: [],
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)

         if (!queue.songs[0]) {
            return interaction.reply({ content: 'Queue is empty', ephemeral: true })
         }

         queue.songs = []

         const { EmbedBuilder } = require('discord.js')
         const embed = new EmbedBuilder()
            .setAuthor({
               name: 'Queue cleared',
               iconURL: interaction.guild.iconURL(),
            })
            .setColor(client.config.player.embedColor)

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
