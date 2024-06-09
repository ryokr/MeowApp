const { EmbedBuilder, InteractionType } = require('discord.js')
const fs = require('fs').promises
const { playMusic, deleteMessage } = require('../../Function')

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
                        await interaction?.reply({ content: 'Join Voice Channel', ephemeral: true })
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
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)
         const songName = interaction.fields.getTextInputValue('songName')

         if (!interaction.member.voice.channel) {
            embed.setDescription('Join voice channel')
            deleteMessage(await interaction.reply({ embeds: [embed]}), 500)
         } else {
            embed.setDescription('Meowing')
            const msg = await interaction.reply({ embeds: [embed] })

            await playMusic(client, interaction, songName)
            deleteMessage(msg, 500)
         }
      }
   } catch (e) {
      console.log('❌    Error\n', e)
   }
}