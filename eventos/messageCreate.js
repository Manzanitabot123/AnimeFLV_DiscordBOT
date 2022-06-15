const Discord = require('discord.js');
const lastuse = new Set();

module.exports = message => {
    let client = message.client
    if (lastuse.has(message.author.username)) return
    lastuse.add(message.author.username)
    setTimeout(() => {
        lastuse.delete(message.author.username)
    }, 60000);
    if (message.content == "<@"+client.user.id+">" && !message.author.bot && !message.content.includes("everyone")&& !message.content.includes("here")){
		const exampleEmbed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({name:`Hola ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`Para poder ver información y descargar animes clásicos, animes del momento y animes populares de AnimeFLV en **${(message.guild === null ? "cualquier servidor" : message.guild.name)}** es necesario que utilices el slash \`/\` antes de un comando. `)
            .setThumbnail("https://cdn.discordapp.com/attachments/945405660433117196/982798663095054406/disc.gif");
        message.reply({embeds: [exampleEmbed]
        })
    } else if (message.content.startsWith("prefix") && message.content.includes("prefix")) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({name:`Hola ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`En **${(message.guild === null ? "cualquier servidor" : message.guild.name)}** es necesario que utilices el slash \`/\` para ejecutar un comando.`)
            .setThumbnail(client.user.displayAvatarURL())
			.setImage("https://cdn.discordapp.com/attachments/945405660433117196/982798663095054406/disc.gif");
        message.reply({embeds: [exampleEmbed]
        })
		//FLV
    } else if (message.content.startsWith("flv") && message.content.includes("flv")) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor({name:`Hola ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`Desafortunadamente, el prefijo \`flv\` para ejecutar un comando ha sido deshabilitado. **Ahora se requiere utilizar el slash* \`/\` *antes del comando.**`)
            .setThumbnail("https://images.emojiterra.com/twitter/v13.1/512px/1f610.png")
        message.reply({embeds: [exampleEmbed]
        })
    }
}
