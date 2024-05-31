module.exports = {
   name: 'previous',
   description: 'Play previous music',
   permissions: '0x0000000000000800',
   options: [],
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         if (!queue || !queue.playing)
            return interaction.reply({ content: `No music playing`, ephemeral: true }).catch((e) => {
               console.log(e)
            })
         try {
            await queue.previous()

            const embed = new EmbedBuilder().setColor(client.config.embedColor).setAuthor({
               name: 'Meowing',
               iconURL: interaction.guild.iconURL(),
            })
            
            const msg = await interaction.reply({ embeds: [embed] }).catch((e) => {})

            setTimeout(async () => {
               if (msg) {
                  await msg.delete().catch((e) => {})
               }
            }, 5000)
         } catch (e) {
            return interaction.reply({ content: `❌ No previous track`, ephemeral: true }).catch((e) => {
               console.log(e)
            })
         }
      } catch (e) {
         console.error(e)
      }
   },
}
