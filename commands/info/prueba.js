const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { stripIndents } = require('common-tags');
var moment = require('moment-timezone');
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = (client, message, args, prefix) => {
    var hora = moment().tz("America/Lima").format("h");
    var minuto = moment().tz("America/Lima").format("mm");
    var am = moment().tz("America/Lima").format("a");
	var día = moment().tz("America/Lima").format("dddd");
    if (día.includes('Thursday') && am.includes("am") && minuto.includes("30")){
        message.reply("Si cumple")
    } else message.reply("No cumple")
}
module.exports.conf = {
    "name": "prueba",
    "description": [ "Ve información del bot y los comandos." ],
    "aliases": ["probar"],
    "usage": ["xd"]
}
