const { showModal } = require('../Functions')

module.exports = {
   name: 'playerVol',
   run: async (interaction, client, queue, embed) => {
      await showModal(interaction, 'playerVolumeModal', 'Volume', 'playerVolumeInput', 'Volume', 'Enter volume between 0 and 100')
   }
}