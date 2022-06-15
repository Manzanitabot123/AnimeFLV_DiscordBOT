const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const command = require('nodemon/lib/config/command');
const crypto = require('crypto').webcrypto;
const privado = require("../utilidades/privado");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Ve la lista de comandos o información detallada sobre cualquier comando')
		.addStringOption(option => option.setName('comando').setDescription('Introduce un comando existente'))
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
	cooldown: '0',
	example: [
		'**/help**',
		'**/help** comando:`emisión` privado:`true`'
	  ],
	guildOnly: false,
	execute (interaction) {
		const { commands } = interaction.client;
        const commandField = interaction.options.getString('comando');

		if (!commandField) {
			const {wallpapers} = require('../recursos/wallpapers.json');
			const num = Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295) * wallpapers.length);
			const noCommandEmbed = new MessageEmbed()
				.setAuthor({name: `AYUDA DEL BOT`, iconURL: (interaction.guild === null ? interaction.user.displayAvatarURL({ dynamic: false }) : interaction.guild.iconURL())})
				.setThumbnail(interaction.user.displayAvatarURL({ dynamic: false }))
				.setDescription(`${textoyemojis.emojis.escribiendo_icon} **El prefijo actual es \`/\`**\n\nEs un bot de Discord 2022 para *ver información y descargar animes clásicos, animes del momento, animes más populares,* todo basado y extraido de AnimeFLV.` + "\n\n"+`${textoyemojis.emojis.pin_icon} **Nota:** Para obtener más información sobre un comando en específico, usa \`/help {comando}\``)
				.addFields({ name: `${textoyemojis.emojis.cutelove} Commandos disponibles [${commands.map(commandA => commandA.data.name).length}]:`, value: `${commands.map(commandB => `**☆** \`${commandB.data.name}\`\n> ${commandB.data.description}`).join('\n')}` })
				.setColor(textoyemojis.embedColor)
				.setImage(wallpapers[num].url)
				.setFooter({text: "Imagen: " + wallpapers[num].title})
            	.setTimestamp();
			console.log(xddddddddddd)
			const buttons = new MessageActionRow()
			.addComponents(new MessageButton()
			.setURL('https://www.animeflv.net/')
			.setEmoji(`${textoyemojis.emojis.animeflv_icon}`)
			.setStyle('LINK'))
			.addComponents(new MessageButton()
			.setURL('https://www.facebook.com/armyanime.jp')
			.setEmoji(`${textoyemojis.emojis.facebook_icon}`)
			.setStyle('LINK'))
			.addComponents(new MessageButton()
			.setURL('https://twitter.com/ArmyAnime_')
			.setEmoji(`${textoyemojis.emojis.twitter_icon}`)
			.setStyle('LINK'))
			.addComponents(new MessageButton()
			.setURL('https://www.instagram.com/animearmy.jp/')
			.setEmoji(`${textoyemojis.emojis.instagram_icon}`)
			.setStyle('LINK'))
			.addComponents(new MessageButton()
			.setURL('https://www.youtube.com/c/kudasai')
			.setEmoji(`${textoyemojis.emojis.youtube_icon}`)
			.setStyle('LINK'));
			privado(interaction, noCommandEmbed, buttons);
		}

		if (commandField) {
			const command = commands.get(commandField.toLowerCase());
				if (!command) return interaction.reply({ content: `${textoyemojis.emojis.cancelar} Ese no un comando válido.`, ephemeral: true });

				const { guildOnly } = command;
				let resultGuildOnly;
					if (guildOnly === true) resultGuildOnly = 'Sí';
					else resultGuildOnly = 'No';

				const commandEmbed = new MessageEmbed()
					.setTitle(`${command.data.name}`)
					.setDescription(`${command.data.description}`)
					.addFields(
						{ name: 'Enfriamiento', value: `\`${command.cooldown}\` segundo(s)`, inline: true },
						{ name: 'Disponible solo en servidores', value: `\`${resultGuildOnly}\``, inline: true },
						{ name: 'Ejemplos', value: command.example.map(x=>`${textoyemojis.emojis.canal} ${x} ${textoyemojis.emojis.cursor} `).join('\n')||'Ninguno', inline: false }
					)
					.setColor(textoyemojis.embedColor);
				privado(interaction, commandEmbed);
			}
		}
};

//imagenes de https://wall.alphacoders.com/by_category.php?id=3&name=Anime+Fondos+de+pantalla&lang=Spanish