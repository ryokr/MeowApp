module.exports = {
   name: 'shuffle',
   description: 'Shuffle the queue',
   options: [],
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         if (!queue || !queue.playing)
            return interaction.reply({ content: `No music playing`, ephemeral: true }).catch((e) => {})

         queue.shuffle()

         const { EmbedBuilder } = require('discord.js')
         const embed = new EmbedBuilder().setColor(client.config.embedColor).setAuthor({
            name: 'Queue shuffled',
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
