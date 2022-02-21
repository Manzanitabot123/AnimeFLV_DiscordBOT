const { Client, Intents, Collection } = require('discord.js');
require("dotenv").config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.CLIENT_TOKEN;
client.commands = new Collection();
client.aliases = new Collection();
client.slash = new Collection();
client.on('ready', () => {
  console.log(`PRENDIDO: ${client.user.tag}`);
  client.user.setPresence(
    { 
        activities: [
            { 
                name: "en AnimeFLV 〢 flvhelp" , 
                type: 'WATCHING' 
            }
        ], 
        status: "idle"
    }
  ) 
  require('./utils/handler')(client)
  require('./utils/event')(client)
});

global.textoyemojis = require('./textoyemojis')

client.login(token);