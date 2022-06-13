const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const privado = require("../utilidades/privado");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Consigue imágenes de Waifus random')
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
    cooldown: '5',
    example: ['**/waifu**'],
    guildOnly: false,
    async execute (interaction) {
        const Anime = await fetch('https://nekos.best/api/v2/waifu')
            .then(res => res.json());

        const embed = new MessageEmbed()
            .setTitle('Waifu')
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
            return privado(interaction, embed, buttons);
        }
};