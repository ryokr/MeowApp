const { InteractionType } = require('discord.js')
const fs = require('fs').promises

module.exports = async (client, interaction) => {
   try {
      if (!interaction.guild) {
         await interaction.reply({ content: 'Rate Limited', ephemeral: true })
         return
      }

      if (interaction.type === InteractionType.ApplicationCommand) {
         const loadCommand = async (path) => {
            try {
               const files = await fs.readdir(path)
               for (const file of files) {
                  const props = require(`${path}/${file}`)

                  if (interaction.commandName === props.name) {
                     if (props.voiceChannel && !interaction.member.voice.channelId) {
                        await interaction?.reply({ content: '🥝 ⬪ Join Voice Channel', ephemeral: true })
                        return
                     }

                     await props.run(client, interaction)
                     return
                  }
               }
            } catch (e) {
               console.log('❌    Load error\n', e)
            }
         }

         await loadCommand(__dirname + '/../../commands')
      }
   } catch (e) {
      console.log('❌    Error\n', e)
   }
}