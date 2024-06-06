const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

module.exports = {
   name: 'seek',
   description: 'Jump to the timestamp',
   permissions: '0x0000000000000800',
   options: [
      {
         name: 'time',
         description: 'Example: 2h 30m 2s',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],
   voiceChannel: true,
   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         if (!queue || !queue.playing) {
            return interaction.reply({ content: `No music playing`, ephemeral: true }).catch((e) => {
               console.log(e)
            })
         }

         const position = getSeconds(interaction.options.getString('time'))
         if (isNaN(position)) {
            return interaction.reply({ content: `Usage: 2h 3m 4s`, ephemeral: true }).catch((e) => {
               console.log(e)
            })
         }

         queue.seek(position)

         const embed = new EmbedBuilder().setColor(client.config.player.embedColor).setAuthor({
            name: 'Seeked',
            iconURL: interaction.guild.iconURL(),
         })

         const msg = await interaction.reply({ embeds: [embed] }).catch((e) => { })

         setTimeout(async () => {
            if (msg) {
               await msg.delete().catch((e) => { })
            }
         }, 5000)
      } catch (error) {
         console.log(error)
      }
   },
}

function getSeconds(str) {
   if (!str) {
      return 0
   }

   const time = str.split(' ')
   let totalSeconds = 0

   for (const part of time) {
      const value = parseInt(part.slice(0, -1))
      const unit = part.slice(-1)

      if (isNaN(value)) {
         return NaN
      }

      switch (unit) {
         case 'h':
            totalSeconds += value * 3600
            break
         case 'm':
            totalSeconds += value * 60
            break
         case 's':
            totalSeconds += value
            break
         default:
            return NaN
      }
   }

   return totalSeconds
}
