module.exports = async () => {
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

const commands = [];
const commandFile = fs.readdirSync('comandos/');
for (const catefile of commandFile) {
const commandFiles = fs.readdirSync('comandos/' + catefile).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
const command = require(`../comandos/${catefile}/${file}`);
commands.push(command.data.toJSON());
}
}

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);
console.log("[COMANDOS CARGADOS] "+commands.map((i)=> i.name).join(" | "))
rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands })
	.then(() => console.log('[ANIMEFLV] Comandos slash actualizados con éxito'))
	.catch(console.error);
};