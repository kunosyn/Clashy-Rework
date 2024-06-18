import Client from 'clash.js'
import DiscordClient from '../DiscordClient'
import { CommandParameters, SlashCommand } from '../types'
import { ChatInputCommandInteraction as Interaction, SlashCommandAssertions, SlashCommandBuilder, SlashCommandStringOption } from 'discord.js'
import { Environment, validateTag } from '../lib'

export const Command = {
  type: 'slash',

  data: new SlashCommandBuilder()
    .setName('clan')
    .setDescription('View information about a clan.')

    .addStringOption((input: SlashCommandStringOption) => input
      .setName('tag')
      .setDescription('The tag of the clan.')
      .setRequired(false)
    )
  ,

  execute
} satisfies SlashCommand


async function execute ({ client, clashClient, interaction }: CommandParameters) {
  if (!interaction.isRepliable()) return

  let clanTag: string | null = interaction.options.getString('tag', false) ?? Environment.CLAN_TAG

  if (!clanTag) {
    await interaction.reply({ content: 'The provided tag is not valid.', ephemeral: true })
    return
  }

  await interaction.deferReply()
  const clan = await clashClient.getClan(clanTag)
  
  if (!clan) {
    await interaction.editReply({ content: `Clan with tag ${clanTag} does not exist!` })
    return
  }

  await interaction.editReply({ content: clan.name })
}
