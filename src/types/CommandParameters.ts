import Client from 'clash.js'
import DiscordClient from '../DiscordClient'
import { ChatInputCommandInteraction as Interaction } from 'discord.js'


export interface CommandParameters {
  client: DiscordClient, 
  clashClient: Client, 
  interaction: Interaction
}
