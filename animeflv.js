const { Client, Intents, Collection, MessageEmbed, MessageAttachment } = require('discord.js');
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
  let clientguilds = client.guilds.cache;
  console.log(clientguilds.map(g => `${g.id} | ${g.name} | ${g.memberCount} usuarios`) || "Ningun servidor")
  const testchart = new MessageAttachment('recursos/feliz_jueves.gif');

  var job = new cron.CronJob('30 00 08 1-31 0-11 4', function() {
    console.log("Feliz jueves.");
    client.user.setPresence({ activities: [{ name: "Feliz jueves" , type: 'WATCHING' }]})
    client.guilds.cache.forEach(guild => {
        try {
        const channelfj = guild.channels.cache.find(channel => channel.permissionsFor(guild.me).has('VIEW_CHANNEL') && channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.type == 'GUILD_TEXT') || guild.channels.cache.first();
        
        let felizjuevesconfig = "verdad";
        let siono = db.get(`felizjueves.${guild.id}`)
        var ffelizjueves;
        if (siono) {
        ffelizjueves = siono
        } else {
        ffelizjueves = felizjuevesconfig
        }

        let felizjuevesconfigcanal = "random";
        let canal_felizjueves = db.get(`felizjueves_canal.${guild.id}`)
        var chfelizjueves;
        if (canal_felizjueves) {
        chfelizjueves = canal_felizjueves
        } else {
        chfelizjueves = felizjuevesconfigcanal
        }

        if (channelfj && ffelizjueves !== "falso" && chfelizjueves === "random") {
            channelfj.send({
                content:`**Feliz jueves a todos** みんなにハッピー木曜日 `,
                files: [testchart]
            });
        } else if (channelfj && ffelizjueves !== "falso" && chfelizjueves !== "random") {
            client.channels.cache.get(chfelizjueves).send({
                content:`**Feliz jueves a todos** みんなにハッピー木曜日 `,
                files: [testchart]
            });
        } else {
            console.log('El server ' + guild.name + ' no tiene canales disponibles o ha desactivado el felizjueves');
        }
    } catch (err) {
        console.log('No se pudo enviar el mensaje a ' + guild.name + '.');
    }
    });
    }, null, true, 'America/Lima');

    var state1 = new cron.CronJob('* 00 * * * *', function() {
        var xd = 0;
        const totaldesrvs = client.guilds.cache.size;
        const totaldeusers = client.guilds.cache.map(g => xd += g.memberCount)[totaldesrvs - 1];
        client.user.setPresence({ activities: [{ name: `en AnimeFLV 〢 ${totaldeusers} usuarios`,  type: 'WATCHING' }]})
    }, null, true, 'America/Lima');

    var state2 = new cron.CronJob('* 12 * * * *', function() {
        client.user.setPresence({ activities: [{ name: `en AnimeFLV 〢 ${client.guilds.cache.size} servidores`,  type: 'WATCHING' }]})
    }, null, true, 'America/Lima');

    var state3 = new cron.CronJob('* 24 * * * *', function() {
        client.user.setPresence({ activities: [{ name: `en AnimeFLV 〢 /help`,  type: 'WATCHING' }]})
    }, null, true, 'America/Lima');

    var state4 = new cron.CronJob('* 36 * * * *', function() {
        client.user.setPresence({ activities: [{ name: `en AnimeFLV 〢 animeflv.net`,  type: 'WATCHING' }]})
    }, null, true, 'America/Lima');


    var state5 = new cron.CronJob('* 48 * * * *', function() {
        client.user.setPresence({ activities: [{ name: `en AnimeFLV 〢 flvhelp`,  type: 'WATCHING' }]})
    }, null, true, 'America/Lima');

    job.start();
    state1.start();
    state2.start();
    state3.start();
    state4.start();
    state5.start();
  
    require('./utils/handler')(client)
    require('./utils/event')(client)
});

global.textoyemojis = require('./recursos/textoyemojis');

let folders = fs.readdirSync(`${__dirname}/commands`);

    folders.forEach((folder) => {
        fs.readdir(`${__dirname}/commands/${folder}`, (err, files) => {

            if (err) return logger.error(`Ocurrió un erro al cargar los comandos: ${err.stack}`);

            if (!files) { return logger.warn(`[ADVERTENCIA]: No se encontraron archivos en el directorio "${folder.toUpperCase()}"`)
            } else { console.log(files.length+" comandos") }

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

client.login(token);