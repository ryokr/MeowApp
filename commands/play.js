const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

module.exports = {
   name: 'play',
   description: 'Play music',
   permissions: '0x0000000000000800',
   voiceChannel: true,
   options: [
      {
         name: 'name',
         description: 'Type music name or link',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],

   run: async (client, interaction) => {
      try {
         const name = interaction.options.getString('name')
         if (!name) {
            return interaction.reply({ content: 'Type music name or link', ephemeral: true }).catch(() => {})
         }

         const embed = new EmbedBuilder().setColor(client.config.embedColor).setAuthor({
            name: 'Meowing',
            iconURL: interaction.guild.iconURL(),
         })

         const msg = await interaction.reply({ embeds: [embed] }).catch(() => {})

         try {
            await client.player.play(interaction.member.voice.channel, name, {
               member: interaction.member,
               textChannel: interaction.channel,
               interaction,
            })
         } catch {
            embed.setDescription('❌  No results found')
            await interaction.editReply({ embeds: [embed] }).catch(() => {})
         }

         setTimeout(async () => {
            if (msg) {
               await msg.delete().catch(() => {})
            }
         }, 2000)
      } catch {}
   },
}
