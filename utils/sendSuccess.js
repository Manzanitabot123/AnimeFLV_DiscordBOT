const { MessageEmbed, Message } = require('discord.js')
/**
 * @param {Message} message
 * @param {String} msg
 */
function sendSuccess(message, msg) {
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("DARK_GREEN")
                    .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(msg)
            ]
        });
}

module.exports = {
    sendSuccess
}
