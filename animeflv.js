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

//PAGINA DE REGISTRO DE LA CONSOLA
const express = require("express");
const app = express();
const { version, author} = require('./package.json');
const PORT = process.env.PORT || 3000;
let TodaLaConsola = [];
console.defaultLog = console.log.bind(console);
console.log = function(){
    TodaLaConsola.push({"type":"log", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
    console.defaultLog.apply(console, arguments);
}
console.defaultError = console.error.bind(console);
console.error = function(){
    TodaLaConsola.push({"type":"error", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
    console.defaultError.apply(console, arguments);
}
console.defaultWarn = console.warn.bind(console);
console.warn = function(){
    TodaLaConsola.push({"type":"warn", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
    console.defaultWarn.apply(console, arguments);
}
console.defaultDebug = console.debug.bind(console);
console.debug = function(){
    TodaLaConsola.push({"type":"debug", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
    console.defaultDebug.apply(console, arguments);
}
app.use(express.static(__dirname));
app.get("", (req, res) => {
  res.send(`<head>
  <link rel="stylesheet" type="text/css" href="recursos/estilo.css" />
  <link rel="icon" href="https://cdn.discordapp.com/avatars/938856255416569946/d5facd45ba90a6774f728365e9266b40.webp" />
  <title>🤖 | AnimeFLV Bot </title>
  </head>
  <body>
  <h1 contenteditable="false"><img alt="Animeflv" src="https://cdn.discordapp.com/avatars/938856255416569946/d5facd45ba90a6774f728365e9266b40.webp">  AnimeFLV Bot v${version}</h1>\n    
  </br>
  <footer class="theme-footer"></footer>
  <h2>Un Bot de Discord (no oficial 🤖) para ver información y descargar animes clásicos, actuales y populares.</h2>\n    
  <p>Consola:</p>
  <pre>${TodaLaConsola.map(x => "<small>("+x.type + ")</small> <b>" +x.datetime + ":</b>\n<mark>" + x.value+"</mark>").join('<br/>')}</pre>
  \n\n    \x3C!-- InfluAds -->\n    
  <div id="influads_block" class="influads_block" style="display: none !important;"></div>
  <p><a href="https://github.com/Manzanitabot123/AnimeFLV_DiscordBOT/issues">Haz click aquí si tienes alguna duda o problema</a> <span>·</span> Hecho por <a href="https://github.com/Manzanitabot123/">${author}</a></p>
  <footer class="theme-footer"></footer>
  </br>
  </br>
  <a href="https://discord.ly/animeflv"><div class="area">◍ Bot en línea</div></a>
  </body>`)
});
app.listen(PORT, () => {
  console.log(`[WEB] Aplicación en el puerto ${PORT}`);
});

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
	console.log(client.guilds.cache.map(g => `[SERVIDOR] ${g.name}`).join('\n'))
	client.user.setStatus("idle")
	client.user.setActivity({ name: "en AnimeFLV 〢 flvhelp",  type: 'WATCHING' })
  	setInterval(() => {
    const randomstatus = [
	{type: 'PLAYING', name: "/help"},
	{type: 'WATCHING', name: `${client.users.cache.size} usuarios`},
	{type: 'WATCHING', name: `${client.guilds.cache.size} servidores`},
	{type: 'WATCHING', name: "🇺🇦 | Apoya a Ucrania con /ucrania"},
	{type: 'PLAYING', name: "/help"},
	{type: 'LISTENING', name: "Openings"},
	{type: 'PLAYING', name: "Shōgi"},
	{type: 'WATCHING', name: "animeflv.net"},
	{type: 'STREAMING', name: "Kudasai | Lina Vermillion", url: "https://www.twitch.tv/linavermillion"},
	{type: 'STREAMING', name: "Kudasai | Kotori Hikari", url: "https://www.twitch.tv/kotorihikari"}
	]
    const randomsts = randomstatus[Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295) * randomstatus.length)];
	client.user.setActivity(randomsts)
    }, 900000);
	//Actualizar comandos
	require('./utilidades/deploy')(client);
	//Eventos
	require('./utilidades/evento')(client);
});

client.login(process.env.CLIENT_TOKEN);

//https://discord.com/api/oauth2/authorize?client_id={CLIENT_ID}&permissions=150055939184&scope=bot%20applications.commands