const { ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js')

module.exports = playerAdd

async function playerAdd(interaction) {
   const modal = new ModalBuilder().setCustomId('playerAddModal').setTitle('Add Music')

   const musicInput = new TextInputBuilder()
      .setCustomId('playerAddInput')
      .setLabel('Name')
      .setStyle('Short')
      .setPlaceholder('Enter music name')

   modal.addComponents(new ActionRowBuilder().addComponents(musicInput))
   await interaction.showModal(modal)
}