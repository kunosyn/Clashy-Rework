import Client from 'clash.js'
import DiscordClient from '../DiscordClient'
import { CommandParameters, SlashCommand } from '../types'
import { ChatInputCommandInteraction as Interaction, SlashCommandBuilder } from 'discord.js'
import { Environment, registerCommands } from '../lib'
import { execSync } from 'child_process'

export const Command = {
  type: 'slash',

  data: new SlashCommandBuilder()
    .setName('restartbot')
    .setDescription('Restarts bot. (Developer Only)')
  ,

  execute
} satisfies SlashCommand


async function execute ({ client, clashClient, interaction }: CommandParameters) {
  console.log(Environment.DEVELOPER_IDS, interaction.user.id)
  if (!Environment.DEVELOPER_IDS.includes(interaction.user.id)) {
    await interaction.reply({ content: 'This command is for developers only.', ephemeral: true })
    return
  }

  await interaction.reply({ content: 'Restarting bot.', ephemeral: true})
  console.log('Bot is being restarted via command.')

  execSync('npm restart')
}
