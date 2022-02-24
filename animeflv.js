const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
require("dotenv").config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', "CHANNEL"] });
const token = process.env.CLIENT_TOKEN;
const cron = require('cron');
const fs = require('fs')
const db = require('quick.db');
const path = require('path');
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
  let clientguilds = client.guilds.cache
  console.log(clientguilds.map(g => `${g.id} | ${g.name}`) || "Ningun servidor")
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
                
                client.aliases.set(props.conf.aliases, props.conf.name);
            });
            console.log(`[CARGADO]: Folder - ${folder}`);
        });
});

var job = new cron.CronJob('13 12 11 1-31 0-11 4', function() {
    console.log("Feliz jueves.");
    var testchart = `https://media.discordapp.net/attachments/946075296069730385/946436742473457664/felizjueves.gif`;
    client.guilds.cache.forEach(guild => {
        try {
        const channel = guild.channels.cache.find(channel => channel.permissionsFor(guild.me).has('VIEW_CHANNEL') && channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.type == 'GUILD_TEXT') || guild.channels.cache.first();
        if (channel) {
            channel.send({
                files: [{
                    attachment: testchart,
                    name: 'feliz_jueves.gif'
                }],
                content:`**Feliz jueves**`,
            });
        } else {
            console.log('El server ' + guild.name + ' no tiene canales.');
        }
    } catch (err) {
        console.log('No se pudo enviar el mensaje a ' + guild.name + '.');
    }
    });
  }, null, true, 'America/Lima');

job.start();

client.login(token);