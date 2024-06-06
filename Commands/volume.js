const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

module.exports = {
   name: 'volume',
   description: 'Adjust volume',
   permissions: '0x0000000000000800',
   options: [
      {
         name: 'volume',
         description: 'Type a number',
         type: ApplicationCommandOptionType.Integer,
         required: true,
      },
   ],
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const maxVol = client.config.voice.maxVol

         if (!queue || !queue.playing) {
            interaction.reply({ content: 'No music playing', ephemeral: true })
            return
         }

         const vol = parseInt(interaction.options.getInteger('volume'))

         if (!vol) {
            interaction.reply({
               content: `Current volume: **${queue.volume}** \nType a number between 1 and ${maxVol}`,
               ephemeral: true,
            })
            return
         }

         if (queue.volume === vol) {
            interaction.reply({ content: 'Volume is already set to **' + vol + '**', ephemeral: true })
            return
         }

         if (vol < 1 || vol > maxVol) {
            interaction.reply({
               content: `Please type a number between 1 and ${maxVol}`,
               ephemeral: true,
            })
            return
         }

         const success = queue.setVolume(vol)

         if (success) {
            const embed = new EmbedBuilder().setColor(client.config.player.embedColor).setAuthor({
               name: `Volume adjusted: ${vol}/${maxVol}`,
               iconURL:
                  'https://cdn.discordapp.com/attachments/1156866389819281418/1157528025739563088/5657-volume-icon.png?ex=6518ef7b&is=65179dfb&hm=1797c2830537a28b5c6a57564517cc509146d02383a69fb4239d7b5d55aceeed&',
            })

            const msg = await interaction.reply({ embeds: [embed] }).catch((e) => {})

            setTimeout(async () => {
               if (msg) {
                  await msg.delete().catch((e) => {})
               }
            }, 5000)

         } else {
            interaction.reply({ content: '❌    Cannot adjust volume', ephemeral: true })
         }
      } catch (e) {
         console.error(e)
      }
   },
}
