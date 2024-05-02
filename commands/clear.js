const { EmbedBuilder } = require('discord.js');

module.exports = {
   name: "clear",
   description: "Clear queue",
   permissions: "0x0000000000000800",
   options: [],
   voiceChannel: true,

   run: async (client, interaction) => {
      const queue = client.player.getQueue(interaction.guild.id);

      try {
         if (!queue || !queue.playing) {
            return interaction.reply({ content: 'No playing music', ephemeral: true });
         }

         if (!queue.songs[0]) {
            return interaction.reply({ content: 'Queue is empty', ephemeral: true });
         }

         await queue.stop(interaction.guild.id);

         const embed = new EmbedBuilder()
            .setColor('#ff4400')
            .setAuthor({
               name: '',
               url: ''
            })
            .setDescription('**Queue cleared**');

         interaction.reply({ embeds: [embed] });
      } catch (e) {
         console.error(e);
      }
   },
};
