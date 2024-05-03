const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
   name: "owner",
   description: "Get information about bot owner.",
   permissions: "0x0000000000000800",
   options: [],

   run: async (client, interaction) => {
      try {
         const youtubeLink = '';
         const InstagramLink = '';
         const { EmbedBuilder } = require('discord.js')
         const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setAuthor({
               name: 'Owner',
               iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157310253520662638/2443-iconperson.png?ex=651824aa&is=6516d32a&hm=0becc4a0fda01e5a02a63cf098db30c287e60a474f8d2da4ddeae7f47d98a5a3&',
               url: ''
            })
            .setDescription('')
            .setTimestamp();
         interaction.reply({ embeds: [embed] }).catch(e => { });

      } catch (e) {
         console.error(e);
      }
   },
};

