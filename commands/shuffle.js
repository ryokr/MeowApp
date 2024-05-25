module.exports = {
   name: 'shuffle',
   description: 'Shuffle the queue',
   options: [],
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         if (!queue || !queue.playing || !track)
            return interaction.reply({ content: `No music playing`, ephemeral: true }).catch((e) => {})

         try {
            queue.shuffle(interaction)

            const { EmbedBuilder } = require('discord.js')
            const embed = new EmbedBuilder().setColor(client.config.embedColor).setAuthor({
               name: 'Queue shuffled',
               iconURL: interaction.guild.iconURL(),
            })

            return interaction.reply({ embeds: [embed] })
         } catch (err) {
            console.log(err)
         }
      } catch (e) {
         console.error(e)
      }
   },
}
