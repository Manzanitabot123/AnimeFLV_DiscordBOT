const { Message } = require("discord.js");
const db = require('quick.db');
require("dotenv").config();
const defprefix = process.env.PREFIX;
/**
 * @param {Message} message
 */
function getPrefix(message) {
    var fprefix;
    let prefix = db.get(`prefixflv.${message.guild.id}`)
    if (prefix) {
        fprefix = prefix
    } else {
        fprefix = defprefix
    }
    return fprefix
}
module.exports = {
    getPrefix
}