const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const privado = require("../utilidades/privado");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sugerencia')
		.setDescription('Redacta una sugerencia para mejorar o arreglar del bot')
        .addStringOption(option => option.setName('mensaje').setDescription('El mensaje con el contenido que deseas sugerir').setRequired(true)),
	cooldown: '120',
	example: ['**/sugenrencia** mensaje:`¿Ves Gintama?`'],
	guildOnly: false,
	execute (interaction) {
		try{
		const sugerencia = interaction.options.getString('mensaje');
        if(sugerencia.length < 15){
            interaction.reply({
                content: `${textoyemojis.emojis.cancelar} Esa sugerencia es muy corta, de igual manera se agradece la intención. (Mínimo: 15 caracteres)`, 
                ephemeral: true
            })
            return;
        }
        const embed = new MessageEmbed()
                .setTitle("Nueva sugerencia desde " + (interaction.guild === null ? "el DM" : interaction.guild.name))
				.setDescription(sugerencia)
				.setColor(textoyemojis.embedColor)
				.setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()});
        
        const embedGracias = new MessageEmbed()
        .setTitle(`Sugerencia enviada`)
        .setDescription(`Muchas gracias, se tomará en cuenta tu mensaje.`)
        .setColor(textoyemojis.embedColor);

		return interaction.reply({ embeds: [embedGracias], ephemeral: true }) && interaction.client.channels.cache.get('988643781718978580').send({ embeds: [embed]}).catch(console.error)
        
		}
		catch { 
			const ErrEmbed = new MessageEmbed()
					.setTitle(`Hubo un error al enviar la sugerencia`)
					.setColor('RED')
			privado(interaction, ErrEmbed);
		}
	}
};