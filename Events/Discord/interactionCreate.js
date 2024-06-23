const fs = require('fs').promises
const { EmbedBuilder, InteractionType } = require('discord.js')
const { playMusic, deleteMessage, getSecond } = require('../../Function')

module.exports = async (client, interaction) => {
   try {
      if (!interaction.guild) {
         await interaction.reply({ content: 'Rate Limited', ephemeral: true })
         return
      }

      if (interaction.type === InteractionType.ApplicationCommand) {
         await handleCommand(client, interaction)
      }

      if (interaction.isModalSubmit()) {
         await handleModalSubmit(client, interaction)
      }
   } catch (e) {
      console.error('❌ Error\n', e)
   }
}

async function handleCommand(client, interaction) {
   const loadCommand = async (path) => {
      try {
         const files = await fs.readdir(path)
         for (const file of files) {
            const props = require(`${path}/${file}`)

            if (interaction.commandName === props.name) {
               if (interaction.guild.id === '677858109145874433' && !hasDJRole(client, interaction.member)) {
                  await interaction.reply({ content: `I'm sleeping, Call Cốn lào Please ❤️‍🔥`, ephemeral: true })
                  return
               }

               if (props.voiceChannel && !interaction.member.voice.channelId) {
                  deleteMessage(await interaction.reply({ content: 'Join Voice Channel' }), 10000)
                  return
               }

               await props.run(client, interaction)
               return
            }
         }
         await interaction.reply({ content: 'Command not found.', ephemeral: true })
      } catch (e) {
         console.error('❌ Command Load Error\n', e)
         await interaction.reply({ content: 'Failed to load command.', ephemeral: true })
      }
   }

   await loadCommand(__dirname + '/../../Commands')
}

function hasDJRole(client, member) {
   return member.roles.cache.has(client.config.player.dj)
}

async function handleModalSubmit(client, interaction) {
   const queue = client.player.getQueue(interaction.guild.id)
   const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

   if (interaction.customId === 'playerAddModal') {
      await handleAddModal(client, interaction, embed)
   } else if (interaction.customId === 'playerSeekModal') {
      await handleSeekModal(client, interaction, queue, embed)
   }
}

async function handleAddModal(client, interaction, embed) {
   const songName = interaction.fields.getTextInputValue('playerAddInput')

   if (!interaction.member.voice.channel) {
      embed.setDescription('Join voice channel')
      deleteMessage(await interaction.reply({ embeds: [embed] }), 5000)
   } else {
      embed.setDescription('Adding song...')
      const msg = await interaction.reply({ embeds: [embed] })

      await playMusic(client, interaction, songName)
      deleteMessage(msg, 10000)
   }
}

async function handleSeekModal(client, interaction, queue, embed) {
   const position = getSecond(interaction.fields.getTextInputValue('playerSeekInput'))

   if (!queue || !queue.playing) {
      embed.setDescription('No music playing')
   } else if (isNaN(position)) {
      embed.setDescription('Invalid time format. Use: 2h 3m 4s')
   } else {
      await queue.seek(position)
      embed.setDescription(`Seeked to ${interaction.fields.getTextInputValue('playerSeekInput')}`)
   }

   deleteMessage(await interaction.reply({ embeds: [embed] }), 10000)
}

// Handle Volume Modal (if uncommented and implemented in the future)
// async function handleVolumeModal(client, interaction, queue, embed) {
//    const maxVol = client.config.player.maxVol;
//    const vol = parseInt(interaction.fields.getTextInputValue('playerVolumeInput'));

//    if (!queue || !queue.playing) {
//       embed.setDescription('No music playing');
//    } else if (queue.volume === vol) {
//       embed.setDescription(`Volume is already set to ${vol}`);
//    } else if (!vol || vol < 1 || vol > maxVol) {
//       embed.setDescription(`Type a number between 1 and ${maxVol}`);
//    } else {
//       await queue.setVolume(vol);
//       embed.setDescription(`Set the volume to ${vol}`);
//    }

//    deleteMessage(await interaction.reply({ embeds: [embed] }), 10000);
// }