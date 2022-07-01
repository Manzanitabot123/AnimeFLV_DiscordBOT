const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const crypto = require('crypto').webcrypto;
const privado = require("../../utilidades/privado");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yankenpo')
        .setDescription('Retame a un juego de piedra, papel o tijeras')
        .addStringOption(privado[1]),
    cooldown: '3',
    example: ['**/yankenpo**'],
    category: 'Secundario',
    guildOnly: false,
    async execute (interaction) {
        const Miniaturas = [
            "https://c.tenor.com/QAOEmlej3UcAAAAC/piedra-papel-tijera.gif",
            "https://i.pinimg.com/originals/28/94/cb/2894cb085145e0070965cddbf79a14de.gif",
            "https://64.media.tumblr.com/0740c74dad067782c20af6e5e3090615/tumblr_o57gwl5pez1v7af0uo3_400.gif",
            "https://pa1.narvii.com/5682/fbd69c8e1c9595b06d5dfd03df0e7a83088b9a70_hq.gif",
            "https://i.pinimg.com/originals/ec/57/47/ec574779ce481605e59dea8e941eace9.gif",
            "https://c.tenor.com/S7duTV-ZsuYAAAAC/hunter-hunter-hunterx-hunter.gif",
            "https://i.imgur.com/fjo1wI9.gif",
            "https://c.tenor.com/Ak6YQ5-DT7kAAAAd/megumin-konosuba.gif",
        ]
        const miniImagenes = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 * Miniaturas.length);
        const embed = new MessageEmbed()
            .setTitle('Piedra, papel o tijeras')
            .setDescription('Elije cualquiera:')
            .setColor(textoyemojis.embedColor)
            .setThumbnail(Miniaturas[miniImagenes]);

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

        privado[0](interaction, [embed], [buttons]);

        const message = await interaction.fetchReply();

        const filter = ft => ft.isButton() && ft.user.id === interaction.user.id;
        const collector = message.createMessageComponentCollector({
            filter,
            max: 1,
            time: 20000
        });
        buttons.components[0].setDisabled(true);
        buttons.components[1].setDisabled(true);
        buttons.components[2].setDisabled(true);
        const choices = ['Piedra', 'Papel', 'Tijeras'];
        const botOption = choices[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 * choices.length)];
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
                await collected.update({ embeds: [userLostEmbed], components: [buttons] }).then(collector.stop());
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
                await collected.update({ embeds: [tieEmbed], components: [buttons] }).then(collector.stop());
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
                await collected.update({ embeds: [userWonEmbed], components: [buttons] }).then(collector.stop());
                }
            });

            collector.on("end", (_, reason) => {
                if (reason === "time") {
                    const tarde = new MessageEmbed()
                    .setTitle('¡Tardaste mucho!')
                    .setColor("RANDOM")
                    .setFooter({text: `Puedes volver a intentarlo cuando quieras`});
                    interaction.editReply({embeds: [tarde], components: [buttons]})
                }
              });

        }
};