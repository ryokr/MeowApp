const { InteractionType } = require('discord.js')
const fs = require('fs')

module.exports = async (client, interaction) => {
   try {
      if (!interaction?.guild) {
         return interaction?.reply({ content: 'Rate Limited', ephemeral: true })
      } else {
         async function loadCommand() {
            if (interaction?.type === InteractionType.ApplicationCommand) {
               fs.readdir(client.config.commandsDir, (err, files) => {
                  if (err) throw err

                  files.forEach(async (f) => {
                     let props = require(`../.${client.config.commandsDir}/${f}`)

                     if (interaction.commandName === props.name) {
                        try {
                           if (props && props.voiceChannel) {
                              const memberVoiceChannelId = interaction?.member?.voice?.channelId
                              const guildMeVoiceChannelId = interaction?.guild?.me?.voice?.channelId

                              if (!memberVoiceChannelId) {
                                 return interaction
                                    ?.reply({ content: `Join Voice Channel`, ephemeral: true })
                                    .catch(() => {})
                              }

                              if (guildMeVoiceChannelId && guildMeVoiceChannelId !== memberVoiceChannelId) {
                                 return interaction
                                    ?.reply({ content: `Enter Same Voice Channel`, ephemeral: true })
                                    .catch(() => {})
                              }
                           }

                           return props.run(client, interaction)
                        } catch (e) {
                           return interaction?.reply({ content: `❌ Error`, ephemeral: true })
                        }
                     }
                  })
               })
            }
         }
         await loadCommand()
      }
   } catch (e) {
      console.error('❌ Cannot Load Commands')
   }
}
