const { ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js')

module.exports = async (interaction) => {
   const modal = new ModalBuilder().setCustomId('playerVolumeModal').setTitle('Volume')

   const Volume = new TextInputBuilder()
      .setCustomId('playerVolumeInput')
      .setLabel('Volume')
      .setStyle('Short')
      .setPlaceholder('Enter volume between 0 and 100')

   modal.addComponents(new ActionRowBuilder().addComponents(Volume))
   await interaction.showModal(modal)
}
