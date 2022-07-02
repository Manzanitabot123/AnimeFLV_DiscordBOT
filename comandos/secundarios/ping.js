const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const privado = require("../../utilidades/privado");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Calcula la latencia del API y WebSocket')
		.addStringOption(privado[1]),
	cooldown: '3',
	example: ['**/ping**'],
	category: 'Secundario',
	guildOnly: false,
	execute (interaction) {
		const embed = new MessageEmbed()
				.setDescription(`${textoyemojis.emojis.escribiendo_icon} Pong! | *Calculando latencia...* ${textoyemojis.emojis.nesuko}`)
				.setColor(textoyemojis.embedColor);
		const elejirPrivado = interaction.options.getString('visibilidad') // 'true';
			interaction.reply({ embeds: [embed], fetchReply: true, ephemeral: (!elejirPrivado||(elejirPrivado==='true')?true:false)}).then(itr => {
				const timestamp = itr.createdTimestamp - interaction.createdTimestamp;
				const newEmbed = new MessageEmbed()
					.setTitle(`Ping de ${interaction.client.user.username}`)
					.addFields(
						{ name: 'Latencia del API', value: `\`${timestamp}\`ms` },
						{ name: 'Latencia de WebSocket', value: `\`${interaction.client.ws.ping}\`ms` }
					)
					.setColor(textoyemojis.embedColor)
					.setThumbnail("https://cdn.dribbble.com/users/252645/screenshots/4275915/tt_bat.gif");
					interaction.editReply({ embeds: [newEmbed]});
		});
	}
};