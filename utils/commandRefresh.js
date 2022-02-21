const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require("dotenv").config();
const appID = process.env.APP_ID;
const token = process.env.CLIENT_TOKEN;
const rest = new REST({ version: '9' }).setToken(token);

function commandRefresh(guildlID, commands){
  
    (async () => {
      
        try {
          console.log('Started refreshing application (/) commands.');
      
          await rest.put(
            Routes.applicationGuildCommands(appID, guildlID),
            { body: commands, },
          );
      
          console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
          console.error(error);
        }
      })();
}
module.exports = {
  commandRefresh
}