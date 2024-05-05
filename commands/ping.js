const { EmbedBuilder } = require('discord.js')
const db = require("../mongoDB");
module.exports = {
   name: "ping",
   description: "Bot latency",
   permissions: "0x0000000000000800",
   options: [],

   run: async (client, interaction) => {
      try {
         const start = Date.now();
         interaction.reply("Pinging....").then(msg => {
            const end = Date.now();
            const embed = new EmbedBuilder()
               .setColor(client.config.embedColor)
               .setTitle(`Bot Latency`)
               .setDescription(`**Pong** : ${end - start}ms`)
            return interaction.editReply({ embeds: [embed] }).catch(e => { });
         }).catch(err => { })

      } catch (e) {
         console.error(e);
      }
   },
};