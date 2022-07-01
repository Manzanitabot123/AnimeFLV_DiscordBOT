const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require('dotenv');
    dotenv.config();
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Inicia un YouTube Together en el canal de voz'),
    cooldown: '10',
    example: ['**/youtube**'],
    category: 'Secundario',
    guildOnly: true,
    execute (interaction) {
        if (!interaction.guild.me.permissions.has('CREATE_INSTANT_INVITE')) return interaction.reply({ content: `${textoyemojis.emojis.cancelar} No tengo permiso. Habilita el permiso **CREAR INVITACIÓN INSTANTÁNEA** en \`Configuración del servidor > Roles\` para usar este comando.`, ephemeral: true });
        if (!interaction.member.voice.channel) return interaction.reply({ content: `${textoyemojis.emojis.cancelar} Debes unirte a un canal de voz para usar este comando.`, ephemeral: true });

        fetch(`https://discord.com/api/v8/channels/${interaction.member.voice.channel.id}/invites`, {
            method: 'POST',
            body: JSON.stringify({
                max_age: 10800,
                max_uses: 0,
                target_application_id: '880218394199220334',
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                'Authorization': `Bot ${process.env.CLIENT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(body => {
            const embed = new MessageEmbed()
                .setTitle('Vean juntos Youtube')
                .setDescription(`${textoyemojis.emojis.youtube_icon} ¡Fiesta creada! Usa este enlace a continuación para unirse a la actividad\nhttps://discord.gg/${body.code}`)
                .setFooter({ text: 'Desarrollado por YouTube' })
                .setThumbnail("https://cliply.co/wp-content/uploads/2021/09/CLIPLY_142110380_ORGANIC_YT_ICON_400.gif")
                .setColor('#ff0000');

                const button = new MessageActionRow()
                    .addComponents(new MessageButton()
                        .setURL(`https://discord.gg/${body.code}`)
                        .setLabel('Unirse')
                        .setStyle('LINK'));

            interaction.reply({ embeds: [embed], components: [button] });
        }).catch(() => {
                interaction.reply({ content: `${textoyemojis.emojis.cancelar} Hubo un error al generar el enlace.`, ephemeral: true });
            });
        }
};