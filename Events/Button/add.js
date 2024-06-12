const { ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js')

module.exports = async (interaction) => {
   const modal = new ModalBuilder().setCustomId('playerAddModal').setTitle('Add Music')

   const addInput = new TextInputBuilder()
      .setCustomId('playerAddInput')
      .setLabel('Name')
      .setStyle('Short')
      .setPlaceholder('Enter music name')

   modal.addComponents(new ActionRowBuilder().addComponents(addInput))
   await interaction.showModal(modal)
}