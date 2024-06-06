module.exports = {
   name: 'owner',
   description: 'Owner info',
   permissions: '0x0000000000000800',
   options: [],

   run: async (client, interaction) => {
      try {
         const { EmbedBuilder } = require('discord.js')

         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setAuthor({
               name: interaction.guild.name,
               iconURL: interaction.guild.iconURL(),
               //iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157310253520662638/2443-iconperson.png?ex=651824aa&is=6516d32a&hm=0becc4a0fda01e5a02a63cf098db30c287e60a474f8d2da4ddeae7f47d98a5a3&',
            })
            .setDescription(`From Pooba Saga with Luv`)
            .setFooter({
               text: `🌱 • By ryohuy2410`,
               iconURL: client.config.ownerIcon,
            })
            .setTimestamp()

         const msg = await interaction.reply({ embeds: [embed] }).catch(() => {})

         setTimeout(async () => {
            if (msg) {
               await msg.delete().catch(() => {})
            }
         }, 40000)
      } catch {}
   }
}
