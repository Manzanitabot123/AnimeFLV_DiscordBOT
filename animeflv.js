const newLocal = require('fs');
const fs = newLocal;
const Discord = require('discord.js');
const dotenv = require('dotenv');
const crypto = require('crypto').webcrypto;
dotenv.config();

//EMOJIS Y TEXTO
global.textoyemojis = require('./recursos/textoyemojis');
//MAYUSCULA PRIMERA LETRA
global.capitalize = function(s){return s && s[0].toUpperCase() + s.slice(1);};

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
	console.log(client.guilds.cache.map(g => `[SERVIDOR] ${g.name}`).join('\n'))
	client.user.setStatus("idle")
	client.user.setActivity({ name: "en AnimeFLV 〢 flvhelp",  type: 'WATCHING' })
  	setInterval(() => {
    const randomstatus = [
	"〢 /help", 
	`〢 ${client.users.cache.size} usuarios`, 
	`〢 ${client.guilds.cache.size} servidores`, 
	"🇺🇦 〢 Apoya a Ucrania con /ucrania", 
	"〢 /help", 
	"〢 animeflv.net"]
    const randomname = randomstatus[Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295) * randomstatus.length)];
	client.user.setActivity({ name: randomname,  type: 'WATCHING' })
    }, 900000);
	//Actualizar comandos
	require('./utilidades/deploy')(client);
	//Eventos
	require('./utilidades/evento')(client);
});

client.login(process.env.CLIENT_TOKEN);

//https://discord.com/api/oauth2/authorize?client_id=938856255416569946&permissions=545352305777&scope=bot