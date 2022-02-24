const { Client, Message, Permissions, MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { sendError } = require("../../utils/sendError");
const { sendSuccess } = require("../../utils/sendSuccess");
/**
 * @param {Client} client
 * @param {Interaction} interaction
 */

module.exports.run = (client, interaction, options) => {
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply(textoyemojis.errors.noPerm)
    var opción;
    if (options.activo.value === true) {
        opción = "verdad"
    } else if (options.activo.value === false) {
        opción = "falso"
    }
    
    let felizjuevesconfig = "verdad";
    let siono = db.get(`felizjueves.${interaction.guildId}`)
    var ffelizjueves;
    if (siono) {
        ffelizjueves = siono
    } else {
        ffelizjueves = felizjuevesconfig
    };

    if (opción === ffelizjueves) {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("DARK_GREEN")
                    .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                    .setTimestamp()
                    .setDescription(textoyemojis.commands.felizjueves.errors.same)
            ],
            ephemeral: true
        })
        return
    } else if (opción === "falso") {
        db.set(`felizjueves.${interaction.guildId}`, "falso")
        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("DARK_GREEN")
                    .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                    .setTimestamp()
                    .setDescription(textoyemojis.commands.felizjueves.messages.newConfig +"**Desactivada** .")
            ]
        })
        return
    } else if (opción === "verdad") {
            db.set(`felizjueves.${interaction.guildId}`, "verdad")
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("DARK_GREEN")
                        .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                        .setTimestamp()
                        .setDescription(textoyemojis.commands.felizjueves.messages.newConfig +"**Activada** .")
                ]
            })
            return
    } else {interaction.reply({
        embeds: [
            new MessageEmbed()
                .setColor("DARK_GREEN")
                .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                .setTimestamp()
                .setDescription(textoyemojis.commands.felizjueves.errors.same)
        ],
        ephemeral: true
    })
    }
}
module.exports.conf = {
    "name": "felizjueves",
    "description": "Activa/desactiva el mensaje semanal de Feliz jueves.",
    "options":[
        {
            "name": "activo",
            "description": "Elije verdadero o falso para activar/desactivar el mensaje. (Por defecto: True)",
            "type": 5,
            "required": true,
        }
    ],
    "category": "info"
} 