const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
require("dotenv").config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.CLIENT_TOKEN;
const fs = require('fs')
const path = require('path')
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

global.textoyemojis = require('./textoyemojis');

let folders = fs.readdirSync(`${__dirname}/commands`);

    folders.forEach((folder) => {
        fs.readdir(`${__dirname}/commands/${folder}`, (err, files) => {

            if (err) return logger.error(`Ocurrió un erro al cargar los comandos: ${err.stack}`);

            if (!files) return logger.warn(`[ADVERTENCIA]: No se encontraron archivos en el directorio "${folder.toUpperCase()}"`);

            files.forEach((file) => {

                let props = require(`./commands/${folder}/${file}`);

                /* Name */
                if (!props.conf || !props.conf.name) return logger.error(`[ADVERTENCIA]: ${file} no tiene suficientes propiedades.`);

                client.commands.set(props.conf.name, props);

                /* Aliases */
                if (!props.conf.aliases) return logger.warn(`[ADVERTENCIA]: ${file} no tiene suficientes alias.`);

                for (let i = 0; i < props.conf.aliases.length; i++) {
                    client.aliases.set(props.conf.aliases[i], props.conf.name);
                };
            });
            console.log(`[CARGADO]: Folder - ${folder}`);
        });
});

client.login(token);