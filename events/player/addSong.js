const db = require("../../mongoDB");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
   if (queue) {
      if (!client.config.opt.loopMessage && queue?.repeatMode !== 0) return;
      if (queue?.textChannel) {
         const embed = new EmbedBuilder()
            .setAuthor({
               name: 'Added To Queue',
               iconURL: '',
               url: ''
            })
            .setDescription(`<@${song.user.id}>, **${song.name}**`)
            .setColor('#ff4400')
            .setFooter({ text: '' });
         queue?.textChannel?.send({ embeds: [embed] }).catch(e => { });
      }
   }
}