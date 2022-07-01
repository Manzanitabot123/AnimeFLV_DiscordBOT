const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const crypto = require('crypto').webcrypto;
const privado = require("../../utilidades/privado");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pregunta')
        .setDescription('Pídele a Magic 8-Ball algo de sabiduría psíquica')
        .addStringOption(option => option.setName('8ball').setDescription('Ingrese tu pregunta para responderte con un si o no').setRequired(true))
        .addStringOption(privado[1]),
    cooldown: '3',
    example: ['**/pregunta** 8ball:`¿Ves Gintama?`'],
    category: 'Secundario',
    guildOnly: false,
    execute (interaction) {
        const questionField = interaction.options.getString('8ball');
        if(!questionField){
            return interaction.reply({
                content: `${textoyemojis.emojis.cancelar} Te falta escribir la pregunta`, 
                ephemeral: true
        })
        } else if(questionField.length < 4){
            return interaction.reply({
                    content: `${textoyemojis.emojis.pensando} ¿Es eso una pregunta?`, 
                    ephemeral: true
                })
        } else {
        const {answers} = require('../../recursos/rpts.json');
        const rpts = Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295) * answers.length);
        const embed = new MessageEmbed()
            .setTitle('8-Ball')
            .addFields(
                { name: 'Pregunta', value: `${questionField}` },
                { name: 'Respuesta', value: `${answers[rpts].text}` }
            )
            .setColor(textoyemojis.embedColor);
        privado[0](interaction, [embed]);
        }
    }
};