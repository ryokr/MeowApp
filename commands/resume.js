const { EmbedBuilder } = require('discord.js')

module.exports = {
   name: 'resume',
   description: 'Resume music.',
   permissions: '0x0000000000000800',
   options: [],
   voiceChannel: true,

   run: async (client, interaction) => {
      const queue = client.player.getQueue(interaction.guild.id)

      try {
         if (!queue) {
            return interaction.reply({ content: 'Queue is empty', ephemeral: true })
         }

         if (!queue.paused) {
            return interaction.reply({ content: 'No paused music', ephemeral: true })
         }

         const success = queue.resume()

         const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setAuthor({
               name: 'Resumed',
               iconURL: interaction.guild.iconURL(),
            })
         //.setDescription(success ? '**Resumed**' : '❌ Error: Unable to resume')

         return interaction.reply({ embeds: [embed] })
      } catch (e) {
         console.error(e)
      }
   },
}
