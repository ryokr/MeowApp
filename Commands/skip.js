const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

module.exports = {
   name: 'skip',
   description: 'Skip current song',
   permissions: '0x0000000000000800',
   options: [
      {
         name: 'number',
         description: 'Amount to skip',
         type: ApplicationCommandOptionType.Number,
         required: false,
      },
   ],
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         if (!queue || !queue.playing)
            return interaction.reply({ content: 'No music playing', ephemeral: true }).catch((e) => {})

         let number = interaction.options.getNumber('number')
         if (number) {
            if (!queue.songs.length > number)
               return interaction.reply({ content: 'Exceeded current no of songs', ephemeral: true }).catch((e) => {})
            if (isNaN(number)) return interaction.reply({ content: 'Invalid Number', ephemeral: true }).catch((e) => {})
            if (1 > number) return interaction.reply({ content: 'Invalid Number', ephemeral: true }).catch((e) => {})

            try {
               await client.player.jump(interaction, number)
               const embed = new EmbedBuilder()
                  .setColor(client.config.player.embedColor)
                  .setDescription(success ? `Skipped` : '❌ Queue is empty')

               const msg = await interaction.reply({ embeds: [embed] }).catch((e) => {})

               setTimeout(async () => {
                  if (msg) {
                     await msg.delete().catch((e) => {})
                  }
               }, 5000)
            } catch (e) {
               return interaction.reply({ content: '❌ Queue is empty', ephemeral: true }).catch((e) => {})
            }
         } else {
            try {
               const queue = client.player.getQueue(interaction.guild.id)
               if (!queue || !queue.playing) {
                  return interaction.reply({ content: 'No music playing', ephemeral: true })
               }

               let old = queue.songs[0]
               const success = await queue.skip()

               const embed = new EmbedBuilder()
                  .setColor(client.config.player.embedColor)
                  .setDescription(success ? `Skipped [${old.name}](${old.url})` : '❌ Queue is empty')

               const msg = await interaction.reply({ embeds: [embed] }).catch((e) => {})

               setTimeout(async () => {
                  if (msg) {
                     await msg.delete().catch((e) => {})
                  }
               }, 5000)
            } catch (e) {
               return interaction.reply({ content: '❌ Queue is empty', ephemeral: true }).catch((e) => {
                  console.log(e)
               })
            }
         }
      } catch (e) {
         console.error(e)
      }
   },
}
