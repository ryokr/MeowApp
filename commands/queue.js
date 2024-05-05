const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
   name: "queue",
   description: "Show the queue",
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
         const forwardId = "emojiForward"
         const backButton = new ButtonBuilder({
            style: ButtonStyle.Secondary,
            emoji: "⬅️",
            customId: backId
         });

         const deleteButton = new ButtonBuilder({
            style: ButtonStyle.Secondary,
            emoji: "❌",
            customId: "close"
         });

         const forwardButton = new ButtonBuilder({
            style: ButtonStyle.Secondary,
            emoji: "➡️",
            customId: forwardId
         });


         let page_length = 10
         let page = 1
         let total = trackl.length / page_length

         const generateEmbed = async (start) => {
            let index = page === 1 ? 1 : page * page_length - page_length + 1
            const current = trackl.slice(start, start + page_length)
            if (!current || !current?.length > 0) return interaction.reply({ content: 'Queue is empty', ephemeral: true }).catch(e => { })
            return new EmbedBuilder()
               // .setTitle(`${interaction.guild.name}  Queue`)
               // .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }))
               //.setAuthor(interaction.guild.iconURL({ size: 2048, dynamic: true }), interaction.guild.name)
               .setColor(client.config.embedColor)
               .setDescription(`**Current**: \`${queue.songs[0].name}\`
                  ${current.map(data =>
                  `\n**\`${index++}\`** | [${data.title}](${data.url})`
               )}`)
               .setFooter({ text: `Page ${page}/${Math.floor(total + 1)}` })
         }

         const canFitOnOnePage = trackl.length <= page_length

         await interaction.reply({
            embeds: [await generateEmbed(0)],
            components: canFitOnOnePage
               ? []
               : [new ActionRowBuilder({ components: [deleteButton, forwardButton] })],
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
                  if (button.customId === forwardId) {
                     page++
                  }

                  button.customId === backId
                     ? (currentIndex -= page_length)
                     : (currentIndex += page_length)

                  await interaction.editReply({
                     embeds: [await generateEmbed(currentIndex)],
                     components: [
                        new ActionRowBuilder({
                           components: [
                              ...(currentIndex ? [backButton] : []),
                              deleteButton,
                              ...(currentIndex + page_length < trackl.length ? [forwardButton] : []),
                           ],
                        }),
                     ],
                  }).catch(e => { })
                  await button?.deferUpdate().catch(e => { })
               }
            })

            // collector.on("end", async (button) => {
            //    button = new ActionRowBuilder().addComponents(
            //       new ButtonBuilder()
            //          .setStyle(ButtonStyle.Secondary)
            //          .setEmoji("⬅️")
            //          .setCustomId(backId)
            //          .setDisabled(true),
            //       new ButtonBuilder()
            //          .setStyle(ButtonStyle.Secondary)
            //          .setEmoji("❌")
            //          .setCustomId("close")
            //          .setDisabled(true),
            //       new ButtonBuilder()
            //          .setStyle(ButtonStyle.Secondary)
            //          .setEmoji("➡️")
            //          .setCustomId(forwardId)
            //          .setDisabled(true))

            //    const embed = new EmbedBuilder()
            //       .setTitle('Command Timeout')
            //       .setColor(`#ecfc03`)
            //       .setDescription('▶️ Execute the Queue command again!!')
            //    return interaction?.editReply({ embeds: [embed], components: [button] }).catch(e => { })

            // })
         }).catch(e => { })

      } catch (e) {
         console.error(e);
      }
   }
}