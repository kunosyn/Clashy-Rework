import Client from 'clash.js'
import DiscordClient from '../DiscordClient'
import { ChatInputCommandInteraction as Interaction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from 'discord.js'
import { CommandParameters } from './CommandParameters'


export interface SlashCommand {
  name?: string,
  data?: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
  type: 'slash' | 'chat',
  execute: (parameters: CommandParameters) => Promise<void>
}
