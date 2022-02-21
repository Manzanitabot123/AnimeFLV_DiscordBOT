const { Client, Message, Permissions, MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { getLang } = require("../../utils/getLang");
const { sendError } = require("../../utils/sendError");
const { sendSuccess } = require("../../utils/sendSuccess");
/**
 * @param {Client} client
 * @param {Message} message
 */

module.exports.run = (client, message, args, prefix, lang) => {

    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return sendError(message, lang.errors.noPerm)
    if (!args[0]){
        sendSuccess(message, lang.commands.setPrefix.messages.prefix+"**"+prefix+"**")
    }else{
        let wprefix = args[0]
        if(wprefix.length > 3) return sendError(message, lang.commands.setPrefix.errors.long)
        if(prefix !== wprefix){
            db.set(`prefix.${message.guild.id}`, wprefix)
            sendSuccess(message, lang.commands.setPrefix.messages.newPrefix+"**"+wprefix+"**")
            return
        }else{ 
            return sendError(message, lang.commands.setPrefix.errors.same)
    }}
    
    
}

module.exports.conf = {
    "name": "prefix",
    "description": [{
        "lang": "es",
        "description": "Ve o establecer el prefijo del bot."
    }, {
        "lang": "en",
        "description": "Set bot's prefix."
    }],
    "aliases": ["setprefix", "sprefix", "prefijo"],
    "usage": [{
        "lang": "es",
        "usage": "prefijo ?p / prefijo"
    }, {
        "lang": "en",
        "usage": "prefix ?p / prefijo"
    }]
}