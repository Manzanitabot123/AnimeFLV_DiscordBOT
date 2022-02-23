const { MessageEmbed, Message } = require('discord.js')
/**
 * @param {Message} message
 */
function sendError(message, error) {
    message.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                    .setColor("DARK_RED")
                    .setTimestamp()
                    .setDescription(error)
            ]
        }).then(msg => {
            setTimeout(() => msg.delete() && message.delete(), 6000)
          });
}
module.exports = {
    sendError
}
