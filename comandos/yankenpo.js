const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const crypto = require('crypto').webcrypto;
const privado = require("../utilidades/privado");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yankenpo')
        .setDescription('Retame a un juego de piedra, papel o tijeras')
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
    example: ['**/yankenpo**'],
    guildOnly: false,
    async execute (interaction) {

        const embed = new MessageEmbed()
            .setTitle('Piedra, papel o tijeras')
            .setDescription('Elije cualquiera:')
            .setColor(textoyemojis.embedColor)
            .setThumbnail("https://c.tenor.com/QAOEmlej3UcAAAAC/piedra-papel-tijera.gif");

        const Yan = new MessageButton()
            .setCustomId('Piedra')
            .setLabel('Piedra')
            .setStyle('SECONDARY');
        const Ken = new MessageButton()
            .setCustomId('Papel')
            .setLabel('Papel')
            .setStyle('SECONDARY');
        const Po = new MessageButton()
            .setCustomId('Tijeras')
            .setLabel('Tijeras')
            .setStyle('SECONDARY');
    
        let buttonList = [
            Yan, Ken, Po
        ]
        const buttons = new MessageActionRow().addComponents(buttonList)

        privado(interaction, embed, buttons);

        const message = await interaction.fetchReply();

        const filter = ft => ft.isButton() && ft.user.id === interaction.user.id;
        const collector = message.createMessageComponentCollector({
            filter,
            max: 1,
            time: 20000
        });

        const choices = ['Piedra', 'Papel', 'Tijeras'];
        const botOption = choices[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 * choices.length)];
        const disabledall = new MessageActionRow().addComponents(
            buttonList[0].setDisabled(true),
            buttonList[1].setDisabled(true),
            buttonList[2].setDisabled(true),
        );
        collector.on('collect', async collected => {
            if (collected.customId === 'Tijeras' && botOption === 'Piedra' || collected.customId === 'Papel' && botOption === 'Piedra' || collected.customId === 'Papel' && botOption === 'Tijeras' || collected.customId === 'Piedra' && botOption === 'Papel') {
                const Happy = await fetch('https://nekos.best/api/v2/happy')
                .then(res => res.json());
                const userLostEmbed = new MessageEmbed()
                    .setTitle('¡Perdiste!')
                    .addFields(
                        { name: 'Tu elejiste:', value: `${collected.customId}` },
                        { name: 'en cambio, yo elejí:', value: `${botOption}` }
                    )
                    .setColor("RED")
                    .setImage(`${Happy.results[0].url}`)
                    .setFooter({text: `Anime: ${Happy.results[0].anime_name} - nekos.best API`});
                await collected.update({ embeds: [userLostEmbed], components: [disabledall] }).then(collector.stop());
            }
            else if (collected.customId === botOption) {
                const Hug = await fetch('https://nekos.best/api/v2/hug')
                .then(res => res.json());
                const tieEmbed = new MessageEmbed()
                    .setTitle('¡Empate!')
                    .addFields(
                        { name: 'Tu elejiste:', value: `${collected.customId}` },
                        { name: 'y yo también elejí:', value: `${botOption}` }
                    )
                    .setColor("YELLOW")
                    .setImage(`${Hug.results[0].url}`)
                    .setFooter({text: `Anime: ${Hug.results[0].anime_name} - nekos.best API`});
                await collected.update({ embeds: [tieEmbed], components: [disabledall] }).then(collector.stop());
            }
            else {
                const Stare = await fetch('https://nekos.best/api/v2/think')
                .then(res => res.json());
                const userWonEmbed = new MessageEmbed()
                    .setTitle('¡Ganaste!')
                    .setThumbnail("https://media.baamboozle.com/uploads/images/165280/1645443586_245296_gif-url.gif")
                    .addFields(
                        { name: 'Tu elejiste:', value: `${collected.customId}` },
                        { name: 'y yo saqué:', value: `${botOption}` }
                    )
                    .setColor("GREEN")
                    .setImage(`${Stare.results[0].url}`)
                    .setFooter({text: `Anime: ${Stare.results[0].anime_name} - nekos.best API`});
                await collected.update({ embeds: [userWonEmbed], components: [disabledall] }).then(collector.stop());
                }
            });

            collector.on("end", (_, reason) => {
                if (reason === "time") {
                    const tarde = new MessageEmbed()
                    .setTitle('¡Tardaste mucho!')
                    .setColor("RANDOM")
                    .setFooter({text: `Puedes volver a intentarlo cuando quieras`});
                    privado(interaction, tarde, disabledall, true);
                }
              });

        }
};