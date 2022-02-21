const { MessageEmbed, Message } = require('discord.js')
/**
 * @param {Message} message
 * @param {String} msg
 */
function sendSuccess(message, msg, reply) {
    if(reply){
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("DARK_GREEN")
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTimestamp()
                    .setDescription(msg)
            ]
        }).then(msg => {
            setTimeout(() => msg.delete() && message.delete(), 6000)
          });
    }else {
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("DARK_GREEN")
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTimestamp()
                    .setDescription(msg)
            ]
        }).then(msg => {
            setTimeout(() => msg.delete() && message.delete(), 6000)
          });
    }
    
}
module.exports = {
    sendSuccess
}
