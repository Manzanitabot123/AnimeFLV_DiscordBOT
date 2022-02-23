const { Client, Message, Permissions, MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { sendError } = require("../../utils/sendError");
const { sendSuccess } = require("../../utils/sendSuccess");
/**
 * @param {Client} client
 * @param {Message} message
 */

module.exports.run = (client, message, args, prefix) => {

    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return sendError(message, textoyemojis.errors.noPerm)
    if (!args[0]){
        sendSuccess(message, textoyemojis.commands.setPrefix.messages.prefix+"**"+prefix+"**")
    }else{
        let wprefix = args[0]
        if(wprefix.length > 3) return sendError(message, textoyemojis.commands.setPrefix.errors.long)
        if(prefix !== wprefix){
            db.set(`prefix.${message.guild.id}`, wprefix)
            sendSuccess(message, textoyemojis.commands.setPrefix.messages.newPrefix+"**"+wprefix+"**")
            return
        }else{ 
            return sendError(message, textoyemojis.commands.setPrefix.errors.same)
    }}
    
    
}

module.exports.conf = {
    "name": "prefix",
    "description": ["Ve o establece el prefijo del bot."],
    "aliases": ["setprefix", "sprefix", "prefijo"],
    "usage": ["prefijo ?p / prefijo"]
}