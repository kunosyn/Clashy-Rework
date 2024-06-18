import Discord from 'discord.js'
import DiscordClient from './DiscordClient'

let client = new DiscordClient({
  intents: [ Discord.GatewayIntentBits.Guilds ],
})

client.start()
