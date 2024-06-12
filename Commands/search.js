const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'search',
   description: 'Search music',
   permissions: '0x0000000000000800',
   voiceChannel: true,
   options: [
      {
         name: 'name',
         description: 'Type music name',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],

   run: async (client, interaction) => {
      try {
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)
         const name = interaction.options.getString('name')

         if (!name)
            return interaction.reply({ content: `❌ Enter a valid song name.`, ephemeral: true }).catch((e) => {
               console.log(e)
            })
         let res
         try {
            res = await client.player.search(name, {
               member: interaction.member,
               textChannel: interaction.channel,
               interaction,
            })
         } catch (e) {
            return interaction.editReply({ content: `❌ No results` }).catch((e) => {
               console.log(e)
            })
         }

         if (!res || !res.length || !res.length > 1)
            return interaction.reply({ content: `❌ No results`, ephemeral: true }).catch((e) => {
               console.log(e)
            })

         const maxTracks = res.slice(0, 10)

         let track_button_creator = maxTracks.map((song, index) => {
            return new ButtonBuilder()
               .setCustomId(`${index + 1}`)
               .setLabel(`${index + 1}`)
               .setStyle(2)
         })

         let row1
         let row2
         if (track_button_creator.length > 10) {
            row1 = new ActionRowBuilder().addComponents(track_button_creator.slice(0, 5))
            row2 = new ActionRowBuilder().addComponents(track_button_creator.slice(5, 10))
         } else {
            if (track_button_creator.length > 5) {
               row1 = new ActionRowBuilder().addComponents(track_button_creator.slice(0, 5))
               row2 = new ActionRowBuilder().addComponents(
                  track_button_creator.slice(5, Number(track_button_creator.length))
               )
            } else {
               row1 = new ActionRowBuilder().addComponents(track_button_creator)
            }
         }

         let cancel = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel('Cancel').setStyle('Danger').setCustomId('cancel')
         )

         embed
            .setAuthor({ name: '─────・ R E S U L T S 🌸・─────', iconURL: client.config.guildIcon })
            .setDescription(
               `${maxTracks
                  .map((song, i) => `${i + 1}. [${song.name}](${song.url})・${song.uploader.name}`)
                  .join('\n')}`
            )
            .setFooter({ text: `✨ Choose a song` })

         let code
         if (row1 && row2) {
            code = { embeds: [embed], components: [row1, row2, cancel] }
         } else {
            code = { embeds: [embed], components: [row1, cancel] }
         }

         interaction
            .reply(code)
            .then(async (Message) => {
               const filter = (i) => i.user.id === interaction.user.id
               let collector = await Message.createMessageComponentCollector({ filter, time: 60000 })

               collector.on('collect', async (button) => {
                  switch (button.customId) {
                     case 'cancel': {
                        await interaction.editReply({ embeds: [], components: [] }).catch(() => {})
                        return collector.stop()
                     }

                     default: {
                        embed
                           .setAuthor({ name: 'Meowing', iconURL: client.config.guildIcon })
                           .setDescription(' ')
                           .setFooter({ text: ' ' })

                        deleteMessage(await interaction.editReply({ embeds: [embed], components: [] }), 100)
                        try {
                           await client.player.play(
                              interaction.member.voice.channel,
                              res[Number(button.customId) - 1].url,
                              {
                                 member: interaction.member,
                                 textChannel: interaction.channel,
                                 interaction,
                              }
                           )
                        } catch (e) {
                           await interaction.editReply({ content: `❌ No results`, ephemeral: true }).catch(() => {})
                        }
                        return collector.stop()
                     }
                  }
               })

               collector.on('end', (msg, reason) => {
                  if (reason === 'time') {
                     embed.setDescription('meow')
                     return interaction.editReply({ embeds: [embed], components: [] }).catch(() => {})
                  }
               })
            })
            .catch((e) => {
               console.log(e)
            })
      } catch (e) {
         console.log(e)
      }
   }
}