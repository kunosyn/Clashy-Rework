import { REST, RESTPutAPIApplicationGuildCommandsJSONBody, RESTPutAPIApplicationGuildCommandsResult, Routes } from 'discord.js'
import { Environment } from './Environment'

import * as fs from 'node:fs'
import { SlashCommand } from '../types'


export async function registerCommands () {
  const commands = []

  const commandFiles = fs.readdirSync(Environment.COMMAND_DIR)

  for (const commandName of commandFiles) {
    if (!commandName.endsWith('.js')) continue
    const { Command } = await import(`../commands/${commandName}`) satisfies { Command: SlashCommand }


    if ('data' in Command && 'execute' in Command) {
      commands.push(Command.data?.toJSON())
    } else {
      console.warn(`Command ${commandName} is missing a "data" or "execute" property.`)
    }
  }

  const rest = new REST().setToken(Environment.CLIENT_TOKEN)

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)

    const data = await rest.put(
      Routes.applicationGuildCommands(Environment.CLIENT_ID.toString(), Environment.GUILD_ID.toString()),
      { body: commands }
    ) as RESTPutAPIApplicationGuildCommandsJSONBody

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
}
