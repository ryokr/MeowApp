const { showModal } = require('../Functions')

module.exports = async (interaction) => {
   await showModal(interaction, 'playerAddModal', 'Add Music', 'playerAddInput', 'Name', 'Enter music name')
}