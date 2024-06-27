const { EmbedBuilder } = require('discord.js')

module.exports = {
   name: 'pic',
   description: 'Send random picture',
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      interaction.deferReply()
      const embed = new EmbedBuilder().setColor(client.config.player.embedColor)
      const response = await fetch('https://shiro.gg/api/images/nsfw/hentai')
      const body = await response.json()
      
      embed
         .setImage(body.url)
         .setURL(body.url)

      await interaction.editReply({ embeds: [embed] })

   },
}
