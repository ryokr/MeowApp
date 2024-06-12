const { ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js')

module.exports = async (interaction) => {
   const modal = new ModalBuilder().setCustomId('playerSeekModal').setTitle('Seek')

   const seekInput = new TextInputBuilder()
      .setCustomId('playerSeekInput')
      .setLabel('Time')
      .setStyle('Short')
      .setPlaceholder('Enter time eg. 2h 3m 4s')

   modal.addComponents(new ActionRowBuilder().addComponents(seekInput))
   await interaction.showModal(modal)
}