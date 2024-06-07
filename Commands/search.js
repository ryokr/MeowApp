const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
   name: 'search',
   description: 'Search music',
   permissions: '0x0000000000000800',
   options: [
      {
         name: 'name',
         description: 'Type music name',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
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

         const embed = new EmbedBuilder()
         embed.setColor(client.config.player.embedColor)
         // embed.setTitle(`Found: ${name}`);

         const maxTracks = res.slice(0, 10)

         let track_button_creator = maxTracks.map((song, index) => {
            return new ButtonBuilder()
               .setLabel(`${index + 1}`)
               .setStyle('Secondary')
               .setCustomId(`${index + 1}`)
         })

         let buttons1
         let buttons2
         if (track_button_creator.length > 10) {
            buttons1 = new ActionRowBuilder().addComponents(track_button_creator.slice(0, 5))
            buttons2 = new ActionRowBuilder().addComponents(track_button_creator.slice(5, 10))
         } else {
            if (track_button_creator.length > 5) {
               buttons1 = new ActionRowBuilder().addComponents(track_button_creator.slice(0, 5))
               buttons2 = new ActionRowBuilder().addComponents(
                  track_button_creator.slice(5, Number(track_button_creator.length))
               )
            } else {
               buttons1 = new ActionRowBuilder().addComponents(track_button_creator)
            }
         }

         let cancel = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel('Cancel').setStyle('Danger').setCustomId('cancel')
         )

         embed
            .setAuthor({
               name: 'Meowing',
               iconURL: client.config.guildIcon,
            })
            .setDescription(
               `${maxTracks
                  .map((song, i) => `${i + 1}. [${song.name}](${song.url}) | \`${song.uploader.name}\``)
                  .join('\n')}`
            )
            .setFooter({ text: `✨ Choose a song` })

         let code
         if (buttons1 && buttons2) {
            code = { embeds: [embed], components: [buttons1, buttons2, cancel] }
         } else {
            code = { embeds: [embed], components: [buttons1, cancel] }
         }

         interaction
            .reply(code)
            .then(async (Message) => {
               const filter = (i) => i.user.id === interaction.user.id
               let collector = await Message.createMessageComponentCollector({ filter, time: 60000 })

               collector.on('collect', async (button) => {
                  switch (button.customId) {
                     case 'cancel': {
                        embed.setDescription(`Search interrupted`)
                        await interaction.editReply({ embeds: [embed], components: [] }).catch((e) => {
                           console.log(e)
                        })
                        return collector.stop()
                     }

                     default: {
                        embed
                           .setAuthor({
                              name: 'Added',
                              iconURL: client.config.guildIcon,
                           })
                           .setThumbnail(maxTracks[Number(button.customId) - 1].thumbnail)
                           .setDescription(
                              `**[${res[Number(button.customId) - 1].name}](${res[Number(button.customId) - 1].url})**`
                           )
                           .setFooter({ text: ` ` })
                        await interaction.editReply({ embeds: [embed], components: [] }).catch((e) => {
                           console.log(e)
                        })
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
                           await interaction.editReply({ content: `❌ No results`, ephemeral: true }).catch((e) => {
                              console.log(e)
                           })
                        }
                        return collector.stop()
                     }
                  }
               })

               collector.on('end', (msg, reason) => {
                  if (reason === 'time') {
                     embed.setDescription('meow')
                     return interaction.editReply({ embeds: [embed], components: [] }).catch((e) => {
                        console.log(e)
                     })
                  }
               })
            })
            .catch((e) => {
               console.log(e)
            })
      } catch (e) {
         console.error(e)
      }
   },
}