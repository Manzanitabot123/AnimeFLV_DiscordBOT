const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const privado = require("../utilidades/privado");

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
        }
        ))
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
    example: ['**/imagen** tema:`waifu`'],
    guildOnly: false,
    async execute (interaction) {
        const temaelejido = interaction.options.getString('tema');
        const Anime = await fetch(`https://nekos.best/api/v2/${temaelejido}`)
            .then(res => res.json());
        function capitalize(s){return s && s[0].toUpperCase() + s.slice(1);}
        
        const embed = new MessageEmbed()
            .setTitle(capitalize(temaelejido))
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