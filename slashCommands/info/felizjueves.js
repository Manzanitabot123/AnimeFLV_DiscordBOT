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

    if (opción === ffelizjueves && options.canal !== undefined) {
        if (opción === "falso") {
            db.set(`felizjueves_canal.${interaction.guildId}`, `random`);
            db.set(`felizjueves.${interaction.guildId}`, "falso");
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("DARK_RED")
                        .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                        .setTimestamp()
                        .setDescription(textoyemojis.commands.felizjueves.messages.randomChanneloff)
                ],
                ephemeral: true
            })
        } else if (opción === "verdad") {
            var canalelejido1 = options.canal.value;
            const channelObject1 = interaction.guild.channels.cache.get(canalelejido1);
            if (channelObject1.type == 'GUILD_TEXT') {
                db.set(`felizjueves_canal.${interaction.guildId}`, `${canalelejido1}`);
                db.set(`felizjueves.${interaction.guildId}`, "verdad");
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("DARK_GREEN")
                            .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                            .setTimestamp()
                            .setDescription(textoyemojis.commands.felizjueves.messages.sigueConfig +"**Activada** ." +`\n`+ textoyemojis.commands.felizjueves.messages.newChannel + `<#${canalelejido1}>`)
                    ]
                })
            } else { 
                interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("DARK_RED")
                        .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                        .setTimestamp()
                        .setDescription(textoyemojis.commands.felizjueves.errors.same)
                        .setFooter({ text: textoyemojis.commands.felizjueves.errors.notextChannel})
                ],
                ephemeral: true
                }) 
            }
        }
    } else if (opción === "falso" && options.canal !== undefined) {
        db.set(`felizjueves_canal.${interaction.guildId}`, `random`);
        db.set(`felizjueves.${interaction.guildId}`, "falso");
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("DARK_GREEN")
                        .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                        .setTimestamp()
                        .setDescription(textoyemojis.commands.felizjueves.messages.randomChanneloff)
                ]
            })
    } else if (opción === "verdad" && options.canal !== undefined) {
        var canalelejido2 = options.canal.value;
        const channelObject2 = interaction.guild.channels.cache.get(canalelejido2);
        if (channelObject2.type == 'GUILD_TEXT') {
            db.set(`felizjueves_canal.${interaction.guildId}`, `${canalelejido2}`);
            db.set(`felizjueves.${interaction.guildId}`, "verdad");
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("DARK_GREEN")
                        .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                        .setTimestamp()
                        .setDescription(textoyemojis.commands.felizjueves.messages.newConfig +"**Activada** ." +`\n`+ textoyemojis.commands.felizjueves.messages.newChannel + `<#${canalelejido2}>`)
                ]
            })
        } else { 
            interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("DARK_RED")
                    .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                    .setTimestamp()
                    .setDescription(textoyemojis.commands.felizjueves.errors.notextChannel)
            ],
            ephemeral: true
            }) 
        }
    } else if (opción === ffelizjueves && options.canal === undefined) {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("DARK_RED")
                    .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
                    .setTimestamp()
                    .setDescription(textoyemojis.commands.felizjueves.errors.same)
            ],
            ephemeral: true
        })
        return
    } else if (opción === "falso" && options.canal === undefined) {
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
    } else if (opción === "verdad" && options.canal === undefined) {
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
                .setColor("DARK_RED")
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
        },
        {
            "name": "canal",
            "description": "Eije el destino del mensaje semanal. (Por defecto: Canal aleatorio)",
            "type": 7,
            "required": false,
        }
    ],
    "category": "info"
} 