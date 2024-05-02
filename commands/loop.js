module.exports = {
   name: "loop",
   description: "Music loop",
   permissions: "0x0000000000000800",
   options: [],
   voiceChannel: true,
   run: async (client, interaction) => {

      try {
         const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
         const queue = client.player.getQueue(interaction.guild.id);
         if (!queue || !queue.playing) return interaction.reply({ content: 'No music playing', ephemeral: true }).catch(e => {})

         let button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
               .setLabel("Queue")
               .setStyle(ButtonStyle.Secondary)
               .setCustomId("queue"),
            new ButtonBuilder()
               .setLabel("Current Song")
               .setStyle(ButtonStyle.Secondary)
               .setCustomId("nowplaying"),
            new ButtonBuilder()
               .setLabel("Unloop")
               .setStyle(ButtonStyle.Danger)
               .setCustomId("close")
         )

         const embed = new EmbedBuilder()
            .setColor('#ff4400')
            .setAuthor({
               name: '',
               url: ''
            })
            .setDescription('**Looping**')

         interaction?.reply({ embeds: [embed], components: [button], fetchReply: true }).then(async Message => {

            const filter = i => i.user.id === interaction.user.id
            let col = await Message.createMessageComponentCollector({ filter, time: 120000 });

            col.on('collect', async (button) => {
               if (button.user.id !== interaction.user.id) return
               const queue1 = client.player.getQueue(interaction.guild.id);
               if (!queue1 || !queue1.playing) {
                  await interaction?.editReply({ content: 'No music playing', ephemeral: true }).catch(e => { })
                  await button?.deferUpdate().catch(e => { })
               }
               switch (button.customId) {
                  case 'queue':
                     const success = queue.setRepeatMode(2);
                     interaction?.editReply({ content: `✅ Looping Queue` }).catch(e => { })
                     await button?.deferUpdate().catch(e => { })
                     break
                  case 'nowplaying':
                     const success2 = queue.setRepeatMode(1);
                     interaction?.editReply({ content: `✅ Looping Activated` }).catch(e => { })
                     await button?.deferUpdate().catch(e => { })
                     break
                  case 'close':
                     if (queue.repeatMode === 0) {
                        await button?.deferUpdate().catch(e => { })
                        return interaction?.editReply({ content: 'Looping already Off', ephemeral: true }).catch(e => { })
                     }
                     const success4 = queue.setRepeatMode(0);
                     interaction?.editReply({ content: 'Looping off' }).catch(e => { })
                     await button?.deferUpdate().catch(e => { })
                     break
               }
            })
            col.on('end', async (button) => {
               button = new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setLabel("Timeout")
                     .setCustomId("timeend")
                     .setDisabled(true))

               const embed = new EmbedBuilder()
                  .setColor('#fc5203')
                  .setTitle('Looping off')
                  .setTimestamp()

               await interaction?.editReply({ content: "", embeds: [embed], components: [button] }).catch(e => { });
            })
         }).catch(e => { })

      } catch (e) {
         console.error(e);
      }
   }
}