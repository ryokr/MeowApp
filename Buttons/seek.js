const { showModal } = require('../Functions')

module.exports = async (interaction) => {
   await showModal(interaction, 'playerSeekModal', 'Seek', 'playerSeekInput', 'Time', 'Enter time e.g., 2h 3m 4s')
}