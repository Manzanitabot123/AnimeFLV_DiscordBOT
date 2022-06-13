const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('sudo')
		.setDescription('Haz un webhook para hacerse pasar por alguien ')
        .addUserOption(option => option.setName('usuario').setDescription('Selecciona a alguien').setRequired(true))
        .addStringOption(option => option.setName('mensaje').setDescription('Escribe el mensaje que se mostrará').setRequired(true)),
    cooldown: '3',
	example: ['**/sudo**'],
	guildOnly: true,
	execute (interaction) {
		try{
        const usuariolejido = interaction.options.getUser('usuario');
        const mensaje = interaction.options.getString('mensaje');
        if(mensaje.length > 200) return interaction.reply({ embeds: [new MessageEmbed()
            .setTitle(`Es un mensaje muy grande`)
            .setColor('RED')],ephemeral: true})
        webhook();
        async function webhook(){
            const webhook = await interaction.channel.createWebhook(usuariolejido.username, {
                avatar: interaction.client.users.cache.get(usuariolejido.id).displayAvatarURL({ dynamic: false }),
                channel: interaction.channel.id
            });
            await webhook.send(mensaje).then(() => {
            webhook.delete();
            })
            const Embed = new MessageEmbed()
					.setTitle(`Comando Sudo`)
					.addFields(
						{ name: 'Usuario:', value: `<@${usuariolejido.id}>` },
						{ name: 'Mensaje:', value: `${mensaje}` }
					)
					.setColor(textoyemojis.embedColor);
            interaction.reply({ embeds: [Embed],ephemeral: true})
        }
		}
		catch { 
			const ErrEmbed = new MessageEmbed()
					.setTitle(`Hubo un error al ejecutar el comando sudo`)
					.setColor('RED')
                    interaction.reply({ embeds: [ErrEmbed],ephemeral: true})
		}
	}
};