const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const crypto = require('crypto').webcrypto;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('interacción')
        .setDescription('Crea una acción o reacción hacia otras personas o hacía ti mísmo')
        .addStringOption(option => option.setName('acción').setDescription('Seleccióna una acción o reacción').setRequired(true).addChoices( { name: 'Alegrarse | happy', value: 'happy' }, { name: 'Dormirse | sleep', value: 'sleep' }, { name: 'Reírse | laugh', value: 'laugh' }, { name: 'Hacer cosquillas | tickle', value: 'tickle' }, { name: 'Besar | kiss', value: 'kiss' }, { name: 'Despedir | wave', value: 'wave' }, { name: 'Pulgar arriba | thumbsup', value: 'thumbsup' }, { name: 'Mirar fijamente | stare', value: 'stare' }, { name: 'Sonreír | smile', value: 'smile' }, { name: 'Decir idiota | baka', value: 'baka' }, { name: 'Sonrojarse | blush', value: 'blush' }, { name: 'Pensar | think', value: 'think' }, { name: 'Poner mala cara | pout', value: 'pout' }, { name: 'Guiñar | wink', value: 'wink' }, { name: 'Disparar | shoot', value: 'shoot' }, { name: 'Presumir | smug', value: 'smug' }, { name: 'Llorar | cry', value: 'cry' }, { name: 'Acariciar la cabeza | pat', value: 'pat' }, { name: 'Golpear | punch', value: 'punch' }, { name: 'Bailar | dance', value: 'dance' }, { name: 'Encoger hombros | shrug', value: 'shrug' }, { name: 'Aburrirse | bored', value: 'bored' }, { name: 'Patear | kick', value: 'kick' }, { name: 'Abrazar | hug', value: 'hug' }, { name: 'Bofetada | slap', value: 'slap' }))
        .addUserOption(option => option.setName('usuario').setDescription('Selecciona a alguien')),
    cooldown: '5',
    example: ['**/interacción** tema:`waifu`'],
    category: 'Secundario',
    guildOnly: false,
    async execute (interaction) {
        const {interacciones} = require('../../recursos/interacciones.json');
        const interacciónElejida = interaction.options.getString('acción');
        const usuariolejido = interaction.options.getUser('usuario');
        let quien;
        let reemplazar;
        if (usuariolejido){
        if (usuariolejido.id === interaction.user.id) return interaction.reply({ content: interacciones[interacciónElejida].haciaTí, ephemeral: true });
        quien = ["Mención", `https://cdn.discordapp.com/avatars/${usuariolejido.id}/${usuariolejido.avatar}`]
        reemplazar = function(x) {const str = x; return str.replace("{tú}", "**"+interaction.user.username+"**").replace("{mencionado}", "**"+usuariolejido.username+"**") }
        } else { 
        quien = ["Usuario", interaction.user.displayAvatarURL({ dynamic: false })]
        reemplazar = function(y) {const str = y; return str.replace("{tú}", "**"+interaction.user.username+"**") }
        }
        const mensaje = interacciones[interacciónElejida][quien[0]];
        const aleatorio = Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295) * mensaje.length);
        const Interact = await fetch(`https://nekos.best/api/v2/${interacciónElejida}`)
            .then(res => res.json());
        const embed = new MessageEmbed()
            .setAuthor({name: `Interacción: ` + interacciónElejida, iconURL: quien[1]})
            .setDescription(reemplazar(mensaje[aleatorio]))
            .setColor(textoyemojis.embedColor)
            .setImage(`${Interact.results[0].url}`)
            .setFooter({text: `Anime: ${Interact.results[0].anime_name} | nekos.best API`})

            return interaction.reply({ embeds: [embed]});
        }
};