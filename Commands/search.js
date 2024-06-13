const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, time } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'search',
   description: 'Search music on youtube',
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

         if (!name) {
            embed.setDescription('Enter a valid song name')
         } else {
            const results = await client.player.search(name, {
               member: interaction.member,
               textChannel: interaction.channel,
               interaction,
            })

            if (!results || results.length === 0) {
               embed.setDescription('No result')
            } else {
               const songs = results.slice(0, 10)

               embed
                  .setAuthor({ name: '─────・ R E S U L T S 🌸・─────', iconURL: client.config.guildIcon })
                  .setDescription(songs.map((song, i) => `${i + 1}. [${song.name}](${song.url})・${song.uploader.name}`).join('\n'))
                  .setFooter({ text: `✨ Choose a song` })

               const buttons = songs.map((song, i) =>
                  new ButtonBuilder()
                     .setCustomId(`${i + 1}`)
                     .setLabel(`${i + 1}`)
                     .setStyle(2)
               )
               const rows = []
               for (let i = 0; i < buttons.length; i += 5) {
                  rows.push(new ActionRowBuilder().addComponents(buttons.slice(i, i + 5)))
               }
               const close = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Close').setStyle('Danger').setCustomId('close'))

               const message = await interaction.reply({ embeds: [embed], components: [...rows, close] })
               const filter = (i) => i.user.id === interaction.user.id
               const collector = message.createMessageComponentCollector({ filter, time: 60000 })

               collector.on('collect', async (button) => {
                  if (button.customId === 'close') {
                     deleteMessage(message, 100)
                     collector.stop()
                  } else {
                     deleteMessage(message, 100)

                     await client.player.play(interaction.member.voice.channel, results[Number(button.customId) - 1].url, {
                        member: interaction.member,
                        textChannel: interaction.channel,
                        interaction,
                     })
                     collector.stop()
                  }
               })
               collector.on('end', async () => {
                  deleteMessage(message, 100)
               })
               return
            }
         }

         deleteMessage(await interaction.reply({ embed: [embed] }), 10000)
      } catch {
         console.log('❌    Search Error')
      }
   }
}