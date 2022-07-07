const newLocal = require('fs');
const fs = newLocal;
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
//EMOJIS Y TEXTO
global.textoyemojis = require('./recursos/textoyemojis');
//MAYUSCULA PRIMERA LETRA
global.capitalize = function(s){return s && s[0].toUpperCase() + s.slice(1);};

//Página
require('./utilidades/app')();

//BOT
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_MESSAGES' ,'GUILD_INTEGRATIONS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'], partials: ['MESSAGE', 'CHANNEL'] });
client.commands = new Discord.Collection();
const comandos = fs.readdirSync('comandos/');
for (const subComandos of comandos) {
const jsComandos = fs.readdirSync('comandos/' + subComandos).filter(file => file.endsWith('.js'));
for (const file of jsComandos) {
	const command = require(`./comandos/${subComandos}/${file}`);
	client.commands.set(command.data.name, command);
}
}
//INICIANDO
client.once('ready', () => {
	console.log(`[ANIMEFLV] Iniciado como ${client.user.tag}\n[ANIMEFLV] Sirviendo a ${client.users.cache.size} usuarios y en ${client.channels.cache.size} canales de ${client.guilds.cache.size} servidores`);
	console.log(client.guilds.cache.map(g => `[SERVIDOR] ${g.name} (${g.memberCount})`).join('\n'))
	client.user.setStatus("idle")
	client.user.setActivity({ name: "flv",  type: 'PLAYING' })
	//Actualizar comandos
	require('./utilidades/deploy')(dotenv, fs);
    //intervalos
    require('./utilidades/Intervalos')(client);
	//Eventos
	require('./utilidades/evento')(client);
});
client.login(process.env.CLIENT_TOKEN);
//https://discord.com/api/oauth2/authorize?client_id={CLIENT_ID}&permissions=150055939184&scope=bot%20applications.commands