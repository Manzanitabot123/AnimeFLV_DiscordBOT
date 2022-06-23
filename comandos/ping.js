const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const privado = require("../utilidades/privado");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Calcula la latencia del API y WebSocket')
		.addStringOption(option => option.setName('privado').setDescription('Solo tu podras ver mis mensajes (Por defecto: Si)').addChoices(
		{
			name: 'Si, solo quiero verlo yo', 
			value: 'true'
		},
		{
			name: 'No, muestralo para todos', 
			value: 'false'
		}
		)),
	cooldown: '3',
	example: ['**/ping**'],
	guildOnly: false,
	execute (interaction) {
		const embed = new MessageEmbed()
				.setDescription(`${textoyemojis.emojis.escribiendo_icon} *Calculando latencia...* ${textoyemojis.emojis.nesuko}`)
				.setColor(textoyemojis.embedColor);
		const private = interaction.options.getString('privado') // 'true';
			interaction.reply({ embeds: [embed], fetchReply: true, ephemeral: (!private||(private==='true')?true:false)}).then(itr => {
				const timestamp = itr.createdTimestamp - interaction.createdTimestamp;
				const newEmbed = new MessageEmbed()
					.setTitle(`Ping de ${interaction.client.user.username}`)
					.addFields(
						{ name: 'Latencia del API', value: `\`${timestamp}\`ms` },
						{ name: 'Latencia de WebSocket', value: `\`${interaction.client.ws.ping}\`ms` }
					)
					.setColor(textoyemojis.embedColor)
					.setThumbnail("https://cdn.dribbble.com/users/252645/screenshots/4275915/tt_bat.gif");
					privado(interaction, newEmbed, false, true);
		});
	}
};