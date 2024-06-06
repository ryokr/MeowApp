class Function {
   getTime() {
      const time = new Date().toLocaleString('en-GB', {
         timeZone: 'Asia/Bangkok',
         hour: '2-digit',
         minute: '2-digit',
         hour12: false,
      })
      return `Today at ${time}`
   }

   async updateEmbed(interaction, currentMsg, embed) {
      await Promise.all([currentMsg.edit({ embeds: [embed] }), interaction.deferUpdate()]).catch(() => {})
   }
}

module.exports = Function