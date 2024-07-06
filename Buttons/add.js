const { showModal } = require('../Functions')

module.exports = {
   name: 'playerAdd',
   run: async (interaction, client, queue, embed) => {
      await showModal(interaction, 'playerAddModal', 'Add Music', 'playerAddInput', 'Name', 'Enter music name')
   }
}