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
            let song = await queue.previous()
            interaction.reply({ content: `**Meowing**` }).catch((e) => {
               console.log(e)
            })
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
