import Client from 'clash.js'
import DiscordClient from '../DiscordClient'
import { CommandParameters, SlashCommand } from '../types'
import { ChatInputCommandInteraction as Interaction, SlashCommandBuilder } from 'discord.js'
import { Environment, registerCommands } from '../lib'

export const Command = {
  type: 'slash',

  data: new SlashCommandBuilder()
    .setName('registercommands')
    .setDescription('Registers slash commands. (Developer Only)')
  ,

  execute
} satisfies SlashCommand


async function execute ({ client, clashClient, interaction }: CommandParameters) {
  if (!Environment.DEVELOPER_IDS.includes(interaction.user.id)) {
    await interaction.reply({ content: 'This command is for developers only.', ephemeral: true })
    return
  }

  await interaction.deferReply()

  await registerCommands()
  await interaction.editReply({ content: 'Commands refreshed successfully' })
}
