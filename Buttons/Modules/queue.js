const { generateQueuePage, queueActionRow, capFirstChar } = require('../../Functions')

module.exports = async (interaction, client, queue, embed) => {
   if (queue.songs.length > 1) {
      const songList = queue.songs.map((song) => ({
         name: song.name,
         url: song.url,
         duration: song.formattedDuration,
      }))
      const pageLength = 10
      const total = Math.ceil(songList.length / pageLength)
      let page = 1

      const queueMessage = await queue.textChannel.send({
         embeds: [generateQueuePage(client, queue, 0, page, total, pageLength, songList)],
         components: [queueActionRow(page, total)],
      })

      const collector = queueMessage.createMessageComponentCollector({ time: 60000 })
      collector.on('collect', async (button) => {
         switch (button.customId) {
            case 'queueClose':
               await queueMessage.delete().catch(() => {})
               collector.stop()
               return
            case 'queueFirst':
               page = 1
               break
            case 'queueBack':
               page--
               break
            case 'queueNext':
               page++
               break
            case 'queueLast':
               page = total
               break
         }

         await queueMessage
            .edit({
               embeds: [generateQueuePage(client, queue, (page - 1) * pageLength, page, total, pageLength, songList)],
               components: [queueActionRow(page, total)],
            })
            .catch(() => {})

         await button.deferUpdate().catch(() => {})
      })

      collector.on('end', async () => {
         await queueMessage.edit({ components: [] }).catch(() => {})
      })

      embed.setFooter({ text: `🌸 Queue Revealed by ${capFirstChar(interaction.user.globalName)}`, iconURL: interaction.user.avatarURL() })
   } else {
      embed.setFooter({ text: `💽 Queue Empty`, iconURL: queue.songs[0].user.avatarURL() })
   }
}