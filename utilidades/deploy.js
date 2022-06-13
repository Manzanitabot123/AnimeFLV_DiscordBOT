const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
	dotenv.config();
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../comandos/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

module.exports = async (client) => {
rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands })
	.then(() => console.log('[ANIMEFLV] Comandos slash actualizados con éxito'))
	.catch(console.error);
};