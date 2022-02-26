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
  client.user.setStatus("idle");
  client.user.setActivity({ name: "en AnimeFLV 〢 flvhelp",  type: 'WATCHING' });
  let clientguilds = client.guilds.cache;
  console.log(clientguilds.map(g => `${g.id} | ${g.name} | ${g.memberCount} usuarios`) || "Ningun servidor")
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


var job = new cron.CronJob('08 08 08 1-31 0-11 4', function() {
    console.log("Feliz jueves.");
    client.user.setActivity({ name: "Feliz jueves",  type: 'WATCHING' })
    var testchart = `https://media.discordapp.net/attachments/946075296069730385/946436742473457664/felizjueves.gif`;
    client.guilds.cache.forEach(guild => {
        try {
        const channel = guild.channels.cache.find(channel => channel.permissionsFor(guild.me).has('VIEW_CHANNEL') && channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.type == 'GUILD_TEXT') || guild.channels.cache.first();
        
        let felizjuevesconfig = "verdad";
        let siono = db.get(`felizjueves.${guild.id}`)
        var ffelizjueves;
        if (siono) {
        ffelizjueves = siono
        } else {
        ffelizjueves = felizjuevesconfig
        };

        let felizjuevesconfigcanal = "random";
        let canal_felizjueves = db.get(`felizjueves_canal.${guild.id}`)
        var chfelizjueves;
        if (canal_felizjueves) {
        chfelizjueves = canal_felizjueves
        } else {
        chfelizjueves = felizjuevesconfigcanal
        };

        if (channel && ffelizjueves !== "falso" && chfelizjueves === "random") {
            channel.send({
                files: [{
                    attachment: testchart,
                    name: 'feliz_jueves.gif'
                }],
                content:`**Feliz jueves a todos**`,
            });
        } else if (channel && ffelizjueves !== "falso" && chfelizjueves !== "random") {
            client.channels.cache.get(chfelizjueves).send({
                files: [{
                    attachment: testchart,
                    name: 'feliz_jueves.gif'
                }],
                content:`**Feliz jueves a todos**`,
            });
        } else {
            console.log('El server ' + guild.name + ' no tiene canales disponibles o ha desactivado el felizjueves');
        }
    } catch (err) {
        console.log('No se pudo enviar el mensaje a ' + guild.name + '.');
    }
    });
}, null, true, 'America/Lima');

var randomstate = new cron.CronJob('30 * * * * *', function() {
    var randomstatus = new Array();
    randomstatus[0] = `en AnimeFLV 〢 flvhelp`;
    randomstatus[1] = `en AnimeFLV 〢 ${client.users.cache.size} usuarios`;
    randomstatus[2] = `en AnimeFLV 〢 ${client.guilds.cache.size} servidores`;
    randomstatus[3] = `en AnimeFLV 〢 animeflv.net`;
    randomstatus[4] = `en AnimeFLV 〢 /help`;
    const randomnumber = Math.floor(randomstatus.length * Math.random());
	client.user.setActivity({ name: randomstatus[randomnumber],  type: 'WATCHING' })
}, null, true, 'America/Lima');

job.start();
randomstate.start();

client.login(token);