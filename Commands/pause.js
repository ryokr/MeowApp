const { EmbedBuilder } = require('discord.js')

module.exports = {
   name: 'pause',
   description: 'Pause playing',
   permissions: '0x0000000000000800',
   options: [],
   voiceChannel: true,

   run: async (client, interaction) => {
      const queue = client.player.getQueue(interaction.guild.id)

      try {
         if (!queue || !queue.playing) {
            return interaction.reply({ content: 'No music playing', ephemeral: true })
         }

         await queue.pause()

         const embed = new EmbedBuilder().setColor(client.config.embedColor).setAuthor({
            name: 'Paused',
            iconURL: interaction.guild.iconURL(),
         })

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
