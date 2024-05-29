const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

module.exports = {
   name: 'play',
   description: 'Play music',
   permissions: '0x0000000000000800',
   options: [
      {
         name: 'name',
         description: 'Type music name or link',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         const name = interaction.options.getString('name')
         if (!name) {
            return interaction.reply({ content: 'Type music name or link', ephemeral: true }).catch((e) => {
               console.log(e)
            })
         }

         const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setAuthor({
               name: 'Meowing',
               iconURL: interaction.guild.iconURL(),
            })

         await interaction.reply({ embeds: [embed] }).catch((e) => {})

         try {
            await client.player.play(interaction.member.voice.channel, name, {
               member: interaction.member,
               textChannel: interaction.channel,
               interaction,
            })
         } catch (e) {
            const errorEmbed = new EmbedBuilder()
               .setColor(client.config.embedColor)
               .setDescription('❌  No results found')

            await interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).catch((e) => {
               console.log(e)
            })
            console.log(e)
         }
      } catch (e) {
         console.error(e)
      }
   },
}
