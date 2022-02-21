const { MessageEmbed, Message } = require('discord.js')
/**
 * @param {Message} message
 */
function sendError(message, error, reply) {
    if (reply) {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setColor("DARK_RED")
                    .setTimestamp()
                    .setDescription(error)
            ]
        }).then(msg => {
            setTimeout(() => msg.delete() && message.delete(), 6000)
          });
    }
    else {
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setColor("DARK_RED")
                    .setTimestamp()
                    .setDescription(error)
            ]
        }).then(msg => {
            setTimeout(() => msg.delete() && message.delete(), 6000)
          });
    }

}
module.exports = {
    sendError
}
