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
         await loadCommand(__dirname + '/../../Commands')
      }

      if (interaction.isModalSubmit() && interaction.customId === 'playerAddModal') {
         const songName = interaction.fields.getTextInputValue('songName')
         const member = interaction.member
         const voiceChannel = member.voice.channel
         let msg = null

         if (!voiceChannel) msg = await interaction.reply({ content: 'Join voice channel' }).catch(() => {})

         msg = await interaction.reply({ content: 'Meowing' }).catch(() => {})
         await client.player.play(voiceChannel, songName, { member }).catch(() => {})

         setTimeout(async () => {
            if (msg) {
               await msg.delete().catch(() => {})
            }
         }, 1000)
      }
   } catch (e) {
      console.log('❌    Error\n', e)
   }
}