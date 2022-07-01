const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const crypto = require('crypto').webcrypto;
const privado = require("../../utilidades/privado");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Ve la lista de comandos o información detallada sobre cualquier comando')
		.addStringOption(option => option.setName('comando').setDescription('Elije o escribe un comando existente').addChoices(
		{
			name: 'Buscar', 
            value: 'buscar'
		},
		{
			name: 'Descargar', 
            value: 'descargar'
		},
		{
			name: 'Emisión', 
            value: 'emisión'
		},
		{
			name: 'Help', 
            value: 'help'
		},
		{
			name: 'Random', 
            value: 'random'
		},
		{
			name: 'Usuario', 
            value: 'usuario'
		},
		{
			name: 'Bot info', 
            value: 'botinfo'
		},
		{
			name: 'Imagen', 
            value: 'imagen'
		},
		{
			name: 'Interacción', 
            value: 'interacción'
		},
		{
			name: 'Ping', 
            value: 'ping'
		},
		{
			name: 'Pregunta', 
            value: 'pregunta'
		},
		{
			name: 'Sudo', 
            value: 'sudo'
		},
		{
			name: 'Sugerencia', 
            value: 'sugerencia'
		},
		{
			name: 'Ucrania', 
            value: 'ucrania'
		},
		{
			name: 'Yankenpo', 
            value: 'yankenpo'
		},
		{
			name: 'Youtube', 
            value: 'youtube'
		}))
		.addStringOption(privado[1]),
	cooldown: '0',
	example: [
		'**/help**',
		'**/help** comando:`Emisión`'
	  ],
	category: 'Principal',
	guildOnly: false,
	async execute (interaction) {
		const commands = interaction.client.commands;
        const commandField = interaction.options.getString('comando');

		if (!commandField) {
			let botones = [
			new MessageButton()
            .setCustomId('first')
            .setLabel('| Comandos principales')
			.setEmoji('🥇')
            .setStyle('SUCCESS'),
			new MessageButton()
            .setCustomId('second')
            .setLabel('| Comandos secundarios')
			.setEmoji('🥈')
            .setStyle('PRIMARY')
			];
			const box = new MessageActionRow().addComponents(botones)
			const {wallpapers} = require('../../recursos/wallpapers.json');
			const num = Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295) * wallpapers.length);
			const principales = commands.filter(c => c.category == 'Principal');
			const secundarios = commands.filter(c => c.category == 'Secundario');

			const noCommandEmbed = new MessageEmbed()
				.setAuthor({name: `AYUDA DEL BOT`, iconURL: (interaction.guild === null ? interaction.user.displayAvatarURL({ dynamic: false }) : interaction.guild.iconURL())})
				.setThumbnail(interaction.user.displayAvatarURL({ dynamic: false }))
				.setDescription(`${textoyemojis.emojis.escribiendo_icon} **El prefijo actual es \`/\`**\n\nEs un bot de Discord 2022 para *ver información y descargar animes clásicos, animes del momento, animes más populares,* todo basado y extraido de AnimeFLV.` + "\n\n"+`${textoyemojis.emojis.pin_icon} **Nota:** Para obtener más información sobre algún comando en específico, escribe: \`/help {comando}\``)
				.addFields({name: `Hay ${commands.map(command => command.data.name).length} disponibles que puedes utilizar`, value: "Haz click en cualquiera de los botones para ver los comandos"})
				.setColor(textoyemojis.embedColor)
				.setImage(wallpapers[num].url)
				.setFooter({text: "Imagen: " + wallpapers[num].title})
            	.setTimestamp();
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
			privado[0](interaction, [noCommandEmbed], [box, buttons]);
			const message = await interaction.fetchReply();
			const elejir = message.createMessageComponentCollector();
			elejir.on("collect", async(collected) => {
				const value = collected.customId
				if (value === "first") {
					noCommandEmbed.fields[0] = { name: `${textoyemojis.emojis.cutelove} Commandos principales [${principales.map(commandA => commandA.data.name).length}]:`, value: `${principales.map(commandB => `**☆** \`${commandB.data.name}\`\n> ${commandB.data.description}`).join('\n')}` }
					box.components[0].setDisabled(true)
					box.components[1].setDisabled(false)
					await collected.deferUpdate();
					interaction.editReply({embeds:[noCommandEmbed], components: [box, buttons]})
				} else if (value === "second") {
					noCommandEmbed.fields[0] = { name: `${textoyemojis.emojis.nesuko} Commandos secundarios [${secundarios.map(commandA => commandA.data.name).length}]:`, value: `${secundarios.map(commandB => `**☆** \`${commandB.data.name}\`\n> ${commandB.data.description}`).join('\n')}` }
					box.components[1].setDisabled(true)
					box.components[0].setDisabled(false)
					await collected.deferUpdate();
					interaction.editReply({embeds:[noCommandEmbed], components: [box, buttons]})
				}
			})
		}

		if (commandField) {
			const command = commands.get(commandField.toLowerCase());
				if (!command) return interaction.reply({ content: `${textoyemojis.emojis.cancelar} Ese no un comando válido.`, ephemeral: true });

				const { guildOnly } = command;
				let resultGuildOnly;
					if (guildOnly === true) resultGuildOnly = 'Sí';
					else resultGuildOnly = 'No';

				const commandEmbed = new MessageEmbed()
					.setTitle(`${global.capitalize(command.data.name)}`)
					.setDescription(`${command.data.description}`)
					.addFields(
						{ name: 'Enfriamiento', value: `\`${command.cooldown}\` segundo(s)`, inline: true },
						{ name: 'Solo servidores', value: `\`${resultGuildOnly}\``, inline: true },
						{ name: 'Categoría', value: `\`${command.category}\``, inline: true },
						{ name: 'Ejemplos', value: command.example.map(x=>`${textoyemojis.emojis.canal} ${x} ${textoyemojis.emojis.cursor} `).join('\n')||'Ninguno', inline: false }
					)
					.setColor(textoyemojis.embedColor);
				privado[0](interaction, [commandEmbed]);
			}
		}
};

//imagenes extraídas de https://wall.alphacoders.com/by_category.php?id=3&name=Anime+Fondos+de+pantalla&lang=Spanish