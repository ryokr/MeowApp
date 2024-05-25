const { EmbedBuilder } = require('discord.js');

module.exports = {
   name: "pause",
   description: "Pause playing",
   permissions: "0x0000000000000800",
   options: [],
   voiceChannel: true,

   run: async (client, interaction) => {
      const queue = client.player.getQueue(interaction.guild.id);

      try {
         if (!queue || !queue.playing) {
            return interaction.reply({ content: 'No music playing', ephemeral: true });
         }

         const success = queue.pause();

         const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setAuthor({
               name: 'Paused',
               iconURL: interaction.guild.iconURL(),
            })
            //.setDescription(success ? '**The music has been Paused for a moment!!**' : '❌ Command Error: Unable to pause song')


         return interaction.reply({ embeds: [embed] });
      } catch (e) {
         console.error(e);
      }
   },
};