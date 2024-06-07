const { EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Function')

module.exports = {
   name: 'help',
   description: 'Commands info',
   permissions: '0x0000000000000800',

   run: async (client, interaction) => {
      try {
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setAuthor({
               name: 'Commands',
               iconURL: interaction.guild.iconURL(),
            })
            .setDescription('\n_ _')
            .addFields(
               { name: '🎹 Play', value: 'Play song', inline: true },
               { name: '🎵 Now Playing', value: 'Current song infor', inline: true },
               { name: '⏹️ Stop', value: 'Stop playing music', inline: true },
               { name: '📊 Queue', value: 'Show queue', inline: true },
               { name: '⏭️ Skip', value: 'Skip the current song', inline: true },
               { name: '⏸️ Pause', value: 'Pause music', inline: true },
               { name: '▶️ Resume', value: 'Resume music', inline: true },
               { name: '🔁 Loop', value: 'Loop mode', inline: true },
               { name: '🔄 Autoplay', value: 'Toggle autoplay', inline: true },
               { name: '⏩ Seek', value: 'Seek to given time', inline: true },
               { name: '⏮️ Previous', value: 'Play previous song', inline: true },
               { name: '🔀 Shuffle', value: 'Shuffle the queue', inline: true },
               { name: '🔊 Volume', value: 'Adjust volume', inline: true },
               { name: '🗑️ Clear', value: 'Clear the queue', inline: true },
               { name: '🔍 Search', value: 'Find the song', inline: true }
            )
            .setFooter({
               text: `🌱 • By ryohuy2410`,
               iconURL: queue.songs[0].user.avatarURL(),
            })
            .setTimestamp()
         //.setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`)

         const msg = await interaction.reply({ embeds: [embed] })
         deleteMessage(msg, 40000)
      } catch (e) {
         console.log('❌    Send Help Error')
      }
   },
}