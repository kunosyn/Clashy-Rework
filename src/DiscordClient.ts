import Discord, { Client, ClientOptions, Events, Interaction, Collection } from 'discord.js'
import Clash, { Client as ClashClient } from 'clash.js'

import { Environment } from './lib'
import { SlashCommand } from './types'
import * as fs from 'node:fs'


export default class DiscordClient extends Client {
  private commands: Collection<string, SlashCommand> = new Collection()

  private clashClient: ClashClient = new ClashClient({
    email: Environment.EMAIL,
    password: Environment.PASSWORD
  })


  constructor (builder: ClientOptions) {
    super(builder)
  }

  public start () {
    this.once(Events.ClientReady, async readyClient => {
      console.log(`Logged in as: ${readyClient.user.tag}`)

      await this.setupCommands()
    })

    this.connectEvents()
    this.login(Environment.CLIENT_TOKEN)
  }

  private connectEvents () {
    this.on(Events.InteractionCreate, async (interaction: Interaction) => {
      await this.handleCommand(interaction)
    })
  }

  private async setupCommands () {
    const commandFiles = fs.readdirSync(Environment.COMMAND_DIR)

    for (const fileName of commandFiles) {
      if (!fileName.endsWith('.js')) continue

      const { Command } = await import(`./commands/${fileName}`) as { Command: SlashCommand }
      
      if (Command.type == 'slash') {
        this.commands.set(Command.data!.name, Command)
      } else {
        this.commands.set(Command.name!, Command)
      }
    }
  }

  private async handleCommand (interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      const command: SlashCommand | undefined = this.commands.get(interaction.commandName)

      if (!command) {
        await interaction.reply({ content: 'This command does not exist!\nThis is a developer error.', ephemeral: true })

        console.log(`Command "${interaction.commandName}" does not exist.`)
        return
      }
      

      command.execute({ client: this, clashClient: this.clashClient, interaction })
    }
  }
}
