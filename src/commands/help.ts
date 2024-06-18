import Client from 'clash.js'
import DiscordClient from '../DiscordClient'
import { CommandParameters, SlashCommand } from '../types'
import { ChatInputCommandInteraction as Interaction, SlashCommandAssertions, SlashCommandBuilder } from 'discord.js'

export const Command = {
  type: 'slash',

  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List all bot commands and their purposes.')
  ,

  execute
} satisfies SlashCommand


async function execute ({ client, clashClient, interaction }: CommandParameters) {
  if (!interaction.isRepliable()) return

  await interaction.reply({ content: 'ur gay' })
}
