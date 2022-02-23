const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { stripIndents } = require('common-tags');
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = (client, message, args, prefix) => {
    const detallesurlmsg = new MessageActionRow().addComponents(
        new MessageButton()
        .setURL('https://www.animeflv.net/')
        .setLabel("Sitio web")
        .setEmoji('<:AnimeFLV:945855622669287534>')
        .setStyle('LINK'),
        new MessageButton()
        .setURL('https://www.facebook.com/groups/armyanime')
        .setLabel("Facebook")
        .setEmoji('<:FacebookFLV:945855771135082546>')
        .setStyle('LINK'),
        new MessageButton()
        .setURL('https://twitter.com/ArmyAnime_')
        .setLabel("Twitter")
        .setEmoji('<:TwitterFLV:945856036064067586>')
        .setStyle('LINK'),
        new MessageButton()
        .setURL('https://www.instagram.com/animearmy.jp/')
        .setLabel("Instagram")
        .setEmoji('<:InstagramFLV:945856237969506304>')
        .setStyle('LINK')
    );
    const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({name: `${message.guild.me.displayName}`, iconURL: message.guild.iconURL()})
            .setThumbnail(client.user.displayAvatarURL());
            let commandNames = [];
            client.commands.forEach(c => {
                commandNames.push(c.conf.name);
            })

            commandNames.forEach(emote => {
                let cmds = client.commands.filter(c => c.conf.name === (emote));
                embed.setDescription(`**El prefijo actual es \`${prefix}\`**\n\nEs un bot de Discord 2022 para ver información y descargar animes clásicos, animes del momento, animes más populares, todo basado y extraido de AnimeFLV. \nActualmente contiene 10 comandos:`)
                embed.addField(`☆ ${emote}`, cmds.map(c => `*${c.conf.description}* \n ( Aliases: ${(c.conf.aliases).join("; ")} )`).join(" "));
            });
            embed.setImage('https://latarde.com/wp-content/uploads/2021/04/alternativas-a-AnimeFLV.jpg');
            embed.setTimestamp();

            return message.reply({embeds: [embed], components:[detallesurlmsg]});
}
module.exports.conf = {
    "name": "help",
    "description": [ "Ve información del bot y los comandos." ],
    "aliases": ["pong", "latencia"],
    "usage": ["latencia"]
}
