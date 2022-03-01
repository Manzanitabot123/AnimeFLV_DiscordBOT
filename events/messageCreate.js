const { MessageEmbed } = require('discord.js');
const { timeout } = require('../config.json');
const { getPrefix } = require('../utils/getprefix');
const lastuse = new Set();
const db = require('quick.db');

module.exports = message => {
    let prefix = getPrefix(message)
    let client = message.client
    if (message.channel.id === "947974543484530748") {
        db.set(`estadoanimeflv.${client.user.id}`, `${message.content}`)
        console.log('Estado: cambiado a: ' + message.content)
    };
    if ((message.mentions.has(client.user)) && !message.author.bot && !message.content.includes("everyone")&& !message.content.includes("here")){
        const exampleEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({name:`Hola ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`Para poder ver información y descargar animes clásicos, animes del momento y animes populares de AnimeFLV en **${message.guild.name}** es necesario que utilices: \`${prefix}\` como prefijo o el comando slash (/). `)
            .setThumbnail(client.user.displayAvatarURL())
        message.reply({embeds: [exampleEmbed]
        })
    } else if (message.content.startsWith("prefix") && message.content.includes("prefix")) {
        const exampleEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({name:`Hola ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`Mi prefijo original es: \`flv\` . Para **${message.guild.name}** es necesario que utilices: \`${prefix}\` como prefijo o el comando slash (/). `)
            .setThumbnail(client.user.displayAvatarURL())
        message.reply({embeds: [exampleEmbed]
        })
    };
    if (message.author.type == "bot") return
    if (!message.content.startsWith(prefix)) return
    if (lastuse.has(message.author.username)) return
    let command = message.content.slice(prefix.length).split(' ')[0]
    let args = message.content.slice(prefix.length).split(' ').slice(1)
    lastuse.add(message.author.username)
    setTimeout(() => {
        lastuse.delete(message.author.username)
    }, timeout * 1000);
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (!cmd) return

    cmd.run(client, message, args, prefix)
}
