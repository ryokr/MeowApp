const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder} = require('discord.js')
const { formatTime, deleteMessage } = require('../Function')

module.exports = {
   name: 'search',
   description: 'Search music',
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
         const name = interaction.options.getString('name')
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         const results = await client.player.search(name, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction,
         })

         if (!results || results.length < 1) {
            embed.setDescription('No result')
            deleteMessage(await interaction.reply({ embed: [embed] }), 10000)
         } else {
            const songs = results.slice(0, 10)

            embed
               .setAuthor({ name: '─────・ R E S U L T S 🌸・─────', iconURL: interaction.guild.iconURL() })
               .setDescription(songs.map((song, i) => `${i + 1}. [${song.name}](${song.url})・${song.uploader.name}・${formatTime(song.formattedDuration)}`).join('\n'))
               .setFooter({ text: `✨ • Choose a song` })

            const buttons = songs.map((song, i) =>
               new ButtonBuilder()
                  .setCustomId(`search${i + 1}`)
                  .setLabel(`${i + 1}`)
                  .setStyle(2)
            )

            const rows = []
            for (let i = 0; i < buttons.length; i += 5) {
               rows.push(new ActionRowBuilder().addComponents(buttons.slice(i, i + 5)))
            }
            const close = new ActionRowBuilder().addComponents(
               new ButtonBuilder().setLabel('Close').setStyle('Danger').setCustomId('searchClose')
            )

            const message = await interaction.reply({ embeds: [embed], components: [...rows, close] })

            const filter = (i) => i.user.id === interaction.user.id
            const listener = message.createMessageComponentCollector({ filter, time: 30000 })

            listener.on('collect', async (button) => {
               if (button.customId === 'searchClose') {
                  listener.stop()
                  deleteMessage(message, 100)
               } else if (button.customId.includes('search')) {
                  deleteMessage(message, 100)
                  await client.player.play(interaction.member.voice.channel, results[Number(button.customId.replace('search', '')) - 1].url, {
                     member: interaction.member,
                     textChannel: interaction.channel,
                     interaction,
                  })
                  listener.stop()
               }
            })

            listener.on('end', async () => {
               deleteMessage(message, 100)
            })
         }
      } catch {
         console.log('❌    Search Error')
      }
   }
}