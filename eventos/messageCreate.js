const Discord = require('discord.js');
const lastuse = new Set();

module.exports = message => {
    let client = message.client
    const ultimo = lastuse.has(message.author.username)
    function ultimoMensaje() {
        lastuse.add(message.author.username)
        setTimeout(() => {
            lastuse.delete(message.author.username)
        }, 200000);
    }
    if (!ultimo && message.content == "<@"+client.user.id+">" && !message.author.bot && !message.content.includes("everyone")&& !message.content.includes("here")){
		ultimoMensaje();
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({name:`Hola ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`Para poder ver información y descargar animes clásicos, animes del momento y animes populares de AnimeFLV en **${(message.guild === null ? "cualquier servidor" : message.guild.name)}** es necesario que utilices el slash \`/\` antes de un comando. `)
            .setThumbnail("https://cdn.discordapp.com/attachments/945405660433117196/982798663095054406/disc.gif");
        message.reply({embeds: [exampleEmbed]
        })
    } else if (!ultimo && message.content.startsWith("prefix") && message.content.includes("prefix")) {
        ultimoMensaje();
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({name:`Hola ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`En **${(message.guild === null ? "cualquier servidor" : message.guild.name)}** es necesario que utilices el slash \`/\` para ejecutar un comando.`)
            .setThumbnail(client.user.displayAvatarURL())
			.setImage("https://cdn.discordapp.com/attachments/945405660433117196/982798663095054406/disc.gif");
        message.reply({embeds: [exampleEmbed]
        })
    } else if (message.channel.id === "992247243287564339") {
        const validUrl = require('valid-url');
        if (message.attachments.size > 0) {
            message.attachments.forEach(attachment => {
            const ImageLink = attachment.proxyURL;
            return client.channels.cache.get('992566119414104095').send({content: `\`${ImageLink.replace("media.discordapp.net/", "cdn.discordapp.com/")}\``})
            })
        } else if (validUrl.isUri(message.content) ){
            return client.channels.cache.get('992566119414104095').send({content: `\`${message.content.replace("media.discordapp.net/", "cdn.discordapp.com/")}\``})
        } else if (!message.author.bot){
            message.delete();
        }
    }}
