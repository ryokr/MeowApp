const { showModal } = require('../../Function')

module.exports = async (interaction) => {
   await showModal(interaction, 'playerAddModal', 'Add Music', 'playerAddInput', 'Name', 'Enter music name')
}