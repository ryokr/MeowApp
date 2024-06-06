const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, time } = require('discord.js')

module.exports = {
   name: 'loop',
   description: 'Loop music',
   permissions: '0x0000000000000800',
   options: [],
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         if (!queue || !queue.playing) {
            return interaction.reply({ content: 'No music playing', ephemeral: true }).catch((e) => {
               console.log('❌❌❌ Reply error\n' + e)
            })
         }

         const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel('Queue').setStyle(ButtonStyle.Secondary).setCustomId('queue'),
            new ButtonBuilder().setLabel('Current Song').setStyle(ButtonStyle.Secondary).setCustomId('nowplaying'),
            new ButtonBuilder().setLabel('Stop Loop').setStyle(ButtonStyle.Danger).setCustomId('close')
         )

         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setAuthor({ name: 'Looping', iconURL: interaction.guild.iconURL() })

         const message = await interaction
            .reply({ embeds: [embed], components: [buttons], fetchReply: true })
            .catch((e) => {
               console.log('❌❌❌ Initial reply error\n' + e)
            })

         const collector = message.createMessageComponentCollector({ time: 60000 })

         collector.on('collect', async (btnInteraction) => {
            if (btnInteraction.user.id !== interaction.user.id) return

            const currentQueue = client.player.getQueue(interaction.guild.id)
            if (!currentQueue || !currentQueue.playing) {
               await btnInteraction.deferUpdate().catch((e) => {
                  console.log('❌❌❌ Defer update error\n' + e)
               })
               return interaction.editReply({ content: 'No music playing', ephemeral: true }).catch((e) => {
                  console.log('❌❌❌ Edit reply error\n' + e)
               })
            }

            let newEmbed
            switch (btnInteraction.customId) {
               case 'queue':
                  currentQueue.setRepeatMode(2)
                  newEmbed = embed.setAuthor({ name: 'Looping queue', iconURL: interaction.guild.iconURL() })
                  break
               case 'nowplaying':
                  currentQueue.setRepeatMode(1)
                  newEmbed = embed.setAuthor({ name: 'Looping current song', iconURL: interaction.guild.iconURL() })
                  break
               case 'close':
                  if (currentQueue.repeatMode === 0) {
                     newEmbed = embed.setAuthor({ name: 'Looping already Off', iconURL: interaction.guild.iconURL() })
                  } else {
                     currentQueue.setRepeatMode(0)
                     newEmbed = embed.setAuthor({ name: 'Loop Off', iconURL: interaction.guild.iconURL() })
                  }
                  break
            }

            await interaction.editReply({ embeds: [newEmbed] }).catch((e) => {
               console.log('❌❌❌ Edit embed error\n' + e)
            })
            await btnInteraction.deferUpdate().catch((e) => {
               console.log('❌❌❌ Defer interaction error\n' + e)
            })
         })

         collector.on('end', () => {
            message.delete().catch((e) => {
               console.log('❌❌❌ Delete message error\n' + e)
            })
         })
      } catch (error) {
         console.log('❌❌❌ Loop error\n' + error)
      }
   },
}
