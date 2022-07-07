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
    } else  if (!ultimo && message.content.startsWith("flv") && message.content.includes("flv")) {
        const comandosSlash = new Discord.MessageSelectMenu()
        .setCustomId('comandos')
        .setPlaceholder('Haz click aquí para saber como usarlos')
        .addOptions([
            { 
                label: `/buscar`,
                emoji: textoyemojis.emojis.buscar,
                value: `buscar`
            },
            { 
                label: `/descargar`,
                emoji: textoyemojis.emojis.descargar,
                value: `descargar`
            },
            { 
                label: `/emisión`,
                emoji: textoyemojis.emojis.emisión,
                value: `emisión`
            },
            { 
                label: `/help`,
                emoji: textoyemojis.emojis.help,
                value: `help`
            },
            { 
                label: `/random`,
                emoji: textoyemojis.emojis.random,
                value: `random`
            }
        ]);

        const row = new Discord.MessageActionRow()
        .addComponents(comandosSlash);

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor({name:`Hola ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`Desafortunadamente, el prefijo \`flv\` para ejecutar un comando ha sido deshabilitado. **Ahora se requiere utilizar el slash ( / ) antes del comando.**\n\nSelecciona cuaquiera de los comandos de abajo para ver un tutorial:`)
            .setThumbnail("https://i.pinimg.com/originals/52/49/2d/52492dfd578e53265da207e2903a5ce7.gif");
        return message.reply({embeds: [exampleEmbed], components: [row]}).then(cmds => {
            const CMD = (interacción) => interacción.user.id === interaction.member.id;
            const collectorEmisión = cmds.createMessageComponentCollector({
                componentType: "SELECT_MENU",
                CMD,
                time: 200000
            });
                //Collector On
                collectorEmisión.on('collect', async(collected) => {
                    await collected.deferUpdate();
                    const select = collected.values[0];
                    cmds.edit({ embeds: [
                    new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(textoyemojis.emojis[select]+ " | Gif de como usar el comando **/"+select+"**")
                        .setImage(textoyemojis.tutorial[select])
                    ]});
                    collectorEmisión.resetTimer();
                })
                collectorEmisión.on('end', a => {
                    message.channel.messages.fetch(cmds.id).then((msg) => { msg.delete().catch((err) =>  { /*a*/})}).catch((err) => { /*b*/})})
                })
    }else if (message.channel.id === "992247243287564339") {
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
