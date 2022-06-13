const Discord = require('discord.js');
const cooldowns = new Discord.Collection();

module.exports = async(interaction) => {
    let client = interaction.client;
    if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	if (command.guildOnly && interaction.channel.type === 'DM') {
		return interaction.reply({ content: `${textoyemojis.emojis.cancelar} Este comando no se puede ejecutar en MD` });
	}

	if (!cooldowns.has(command.data.name)) {
		cooldowns.set(command.data.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.data.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(interaction.user.id)) {
		const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
				return interaction.reply({ content: `Por favor, espera **${timeLeft.toFixed(1)}** segundo(s) más para usar \`${command.data.name}\``, ephemeral: true });
			}
		}

	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: `${textoyemojis.emojis.cancelar} ¡Hubo un error al ejecutar este comando!` });
	}
}
