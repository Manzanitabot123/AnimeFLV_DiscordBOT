const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ucrania')
		.setDescription('¡Por favor, dona lo que puedas para ayudar a esta lucha por la libertad!'),
	cooldown: '3',
	example: ['**/ucrania**'],
	category: 'Secundario',
	guildOnly: false,
	execute (interaction) {
		const link = new MessageActionRow().addComponents(
			new MessageButton()
			.setURL('https://helpukrainewin.org')
			.setLabel("Apoyar aquí")
			.setStyle('LINK')
		);
		interaction.reply({
				embeds: [
					new MessageEmbed()
					.setDescription('El 24 de febrero de 2022, Rusia inició una invasión masiva a Ucrania, una democracia europea de 44 millones de personas. \n**Esta página fue creada por la comunidad tecnológica ucraniana para recaudar fondos y proporcionar suministros esenciales al pueblo ucraniano que lucha contra la agresión rusa en el frente.** \n\n*"¡Por favor, done lo que pueda para ayudar en esta lucha por la libertad!"*')
					.setColor('YELLOW')
					.setThumbnail("https://i0.wp.com/helpukrainewin.org/wp-content/uploads/2022/02/ukraine-1.png?resize=154%2C154&ssl=1")
					.setAuthor({name: "Ayuda a Ucrania a ganar", iconURL:"https://cdn-icons-png.flaticon.com/512/197/197572.png", url: "https://helpukrainewin.org"})
					.setFooter({text: `Nota: Recuerda que es a voluntad, nada obligado.`})
				], components:[link], ephemeral: true 
		})
		}
};