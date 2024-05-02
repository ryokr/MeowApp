const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
   name: "queue",
   description: "It shows you the queue list.",
   permissions: "0x0000000000000800",
   options: [],
   run: async (client, interaction) => {

      try {

         const queue = client.player.getQueue(interaction.guild.id);
         if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ No music playing!!', ephemeral: true }).catch(e => { })
         if (!queue.songs[0]) return interaction.reply({ content: '⚠️ Queue is empty!!', ephemeral: true }).catch(e => { })

         const trackl = []
         queue.songs.map(async (track, i) => {
            trackl.push({
               title: track.name,
               author: track.uploader.name,
               user: track.user,
               url: track.url,
               duration: track.duration
            })
         })

         const backId = "emojiBack"
         const nextId = "emojiForward"
         const backButton = new ButtonBuilder({
            style: ButtonStyle.Success,
            emoji: "⬅️",
            customId: backId
         });

         const deleteButton = new ButtonBuilder({
            style: ButtonStyle.Secondary,
            emoji: "❌",
            customId: "close"
         });

         const nextButton = new ButtonBuilder({
            style: ButtonStyle.Success,
            emoji: "➡️",
            customId: nextId
         });


         let PAGE_LENGTH = 10
         let page = 1
         let a = trackl.length / PAGE_LENGTH

         const generateEmbed = async (start) => {
            let sayı = page === 1 ? 1 : page * PAGE_LENGTH - PAGE_LENGTH + 1
            const current = trackl.slice(start, start + PAGE_LENGTH)
            if (!current || !current?.length > 0) return interaction.reply({ content: '⚠️ Queue is empty!!', ephemeral: true }).catch(e => { })
            return new EmbedBuilder()
               .setTitle(`${interaction.guild.name}  Queue`)
               .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }))
               .setColor(client.config.embedColor)
               .setDescription(`▶️ Now playing: \`${queue.songs[0].name}\`
    ${current.map(data =>
                  `\n\`${sayı++}\` | [${data.title}](${data.url}) | (Executed by <@${data.user.id}>)`
               )}`)
               .setFooter({ text: `Page ${page}/${Math.floor(a + 1)}` })
         }

         const canFitOnOnePage = trackl.length <= PAGE_LENGTH

         await interaction.reply({
            embeds: [await generateEmbed(0)],
            components: canFitOnOnePage ? [] : [new ActionRowBuilder({ components: [deleteButton, nextButton] })],
            fetchReply: true
         }).then(async Message => {
            const filter = i => i.user.id === interaction.user.id
            const collector = Message.createMessageComponentCollector({ filter, time: 120000 });


            let currentIndex = 0
            collector.on("collect", async (button) => {
               if (button?.customId === "close") {
                  collector?.stop()
                  return button?.reply({ content: 'Command Cancelled', ephemeral: true }).catch(e => { })
               } else {

                  if (button.customId === backId) {
                     page--
                  }
                  if (button.customId === nextId) {
                     page++
                  }

                  button.customId === backId
                     ? (currentIndex -= PAGE_LENGTH)
                     : (currentIndex += PAGE_LENGTH)

                  await interaction.editReply({
                     embeds: [await generateEmbed(currentIndex)],
                     components: [
                        new ActionRowBuilder({
                           components: [
                              ...(currentIndex ? [backButton] : []),
                              deleteButton,
                              ...(currentIndex + PAGE_LENGTH < trackl.length ? [nextButton] : []),
                           ],
                        }),
                     ],
                  }).catch(e => { })
                  await button?.deferUpdate().catch(e => { })
               }
            })
         }).catch(e => { })

      } catch (e) {
         console.error(e);
      }
   }
}