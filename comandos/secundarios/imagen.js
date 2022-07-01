const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const fs = require('fs');
const crypto = require('crypto').webcrypto;
const privado = require("../../utilidades/privado");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imagen')
        .setDescription('Consigue imágenes de artistas de Waifus, Nekos y Kitsunes')
        .addStringOption(option => option.setName('tema').setDescription('Selecciona el tema de la imagen').setRequired(true).addChoices(
        {
            name: 'Waifu', 
            value: 'waifu'
        },
        {
            name: 'Kitsune', 
            value: 'kitsune'
        },
        {
            name: 'Neko', 
            value: 'neko'
        },
        {
            name: 'Loli', 
            value: 'loli'
        }
        ))
        .addStringOption(privado[1]),
    cooldown: '5',
    example: ['**/imagen** tema:`waifu`'],
    category: 'Secundario',
    guildOnly: false,
    async execute (interaction) {
        const temaelejido = interaction.options.getString('tema');
        if(temaelejido === 'loli') {
        const laslolis = fs.readFileSync('././recursos/lolis.txt', 'utf8').split('\n');
        const linkdeloli = laslolis[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295 * laslolis.length)];
        return privado[0](interaction, [new MessageEmbed()
            .setTitle('Loli')
            .setColor('RANDOM')
            .setImage(linkdeloli)
            .setFooter({text: `Contribución de ブラックレゾン - AnimeFLV`, iconURL: (interaction.user.displayAvatarURL({dynamic: 'false'}))})])
        }

        const Anime = await fetch(`https://nekos.best/api/v2/${temaelejido}`)
            .then(res => res.json());
        
        const embed = new MessageEmbed()
            .setTitle(global.capitalize(temaelejido))
            .setImage(`${Anime.results[0].url}`)
            .setFooter({ text: `Hecho por ${Anime.results[0].artist_name} - nekos.best API` })
            .setColor(textoyemojis.embedColor);

            const buttons = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setURL(`${Anime.results[0].artist_href}`)
                    .setLabel('Artista')
                    .setStyle('LINK'))
                .addComponents(new MessageButton()
                    .setURL(`${Anime.results[0].source_url}`)
                    .setLabel('Imagen Original')
                    .setStyle('LINK'));
            return privado[0](interaction, [embed], [buttons]);
        }
};