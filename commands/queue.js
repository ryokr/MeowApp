const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
   name: 'queue',
   description: 'Show the queue',
   permissions: '0x0000000000000800',
   options: [],

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)

         if (!queue || !queue.playing)
            return interaction.reply({ content: 'No music playing', ephemeral: true }).catch((e) => {
               console.log(e)
            })
         if (!queue.songs[0])
            return interaction.reply({ content: 'Queue is empty', ephemeral: true }).catch((e) => {
               console.log(e)
            })

         const trackList = []
         queue.songs.map(async (track, i) => {
            trackList.push({
               title: track.name,
               author: track.uploader.name,
               user: track.user,
               url: track.url,
               duration: track.duration,
            })
         })

         const backId = 'emojiBack'
         const nextId = 'emojiNext'

         const backButton = new ButtonBuilder()
            .setLabel('Previous Page')
            .setStyle(ButtonStyle.Danger)
            .setCustomId(backId)
         const nextButton = new ButtonBuilder().setLabel('Next Page').setStyle(ButtonStyle.Danger).setCustomId(nextId)

         let pageLength = 10
         let page = 1
         let total = trackList.length / pageLength

         const generateEmbed = async (start) => {
            let index = page === 1 ? 1 : page * pageLength - pageLength + 1
            const current = trackList.slice(start, start + pageLength)
            if (!current || !current?.length > 0)
               return interaction.reply({ content: 'Queue is empty', ephemeral: true }).catch((e) => {
                  console.log(e)
               })
            return (
               new EmbedBuilder()
                  .setColor(client.config.embedColor)
                  // .setThumbnail(queue.songs[0].thumbnail)
                  .setAuthor({
                     name: 'Queue • 🌱',
                     iconURL: client.config.guildIcon,
                  })
                  .setDescription(`${current.map((song) => `\n${index++}. [${song.title}](${song.url})`)}`)
                  .setFooter({
                     text: `💽 • Page ${page} / ${Math.floor(total + 1)}`,
                  })
            )
         }

         const inOnePage = trackList.length <= pageLength

         await interaction
            .reply({
               embeds: [await generateEmbed(0)],
               components: inOnePage ? [] : [new ActionRowBuilder({ components: [nextButton] })],
               fetchReply: true,
            })
            .then(async (Message) => {
               const filter = (i) => i.user.id === interaction.user.id
               const collector = Message.createMessageComponentCollector({
                  filter,
                  time: 60000,
               })

               let currentIndex = 0
               collector.on('collect', async (button) => {
                  if (button.customId === backId) page--
                  if (button.customId === nextId) page++

                  button.customId === backId ? (currentIndex -= pageLength) : (currentIndex += pageLength)

                  await interaction
                     .editReply({
                        embeds: [await generateEmbed(currentIndex)],
                        components: [
                           new ActionRowBuilder({
                              components: [
                                 ...(currentIndex ? [backButton] : []),
                                 ...(currentIndex + pageLength < trackList.length ? [nextButton] : []),
                              ],
                           }),
                        ],
                     })
                     .catch((e) => {})
                  await button?.deferUpdate().catch((e) => {
                     console.log(e)
                  })
               })
               collector.on('end', async () => {
                  await interaction
                     .editReply({
                        components: [],
                     })
                     .catch((e) => {
                        console.log(e)
                     })
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
