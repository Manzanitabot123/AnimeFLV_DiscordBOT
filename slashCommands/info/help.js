const { Client, Interaction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require('quick.db');
require("dotenv").config();
const defprefix = process.env.PREFIX;
/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports.run =  (client,interaction) => {
    const detallesurl = new MessageActionRow().addComponents(
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
            .setAuthor({name: `${interaction.guild.me.displayName}`, iconURL: interaction.guild.iconURL()})
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: false }));
            let commandNames = [];
            client.commands.forEach(c => {
                commandNames.push(c.conf.name);
            })

            var fprefix;
            let prefix = db.get(`prefixflv.${interaction.guildId}`)
            if (prefix) {
                fprefix = prefix
            } else {
                fprefix = defprefix
            }

            commandNames.forEach(emote => {
                let cmds = client.commands.filter(c => c.conf.name === (emote));
                embed.setDescription(`**El prefijo actual es \`${fprefix}\`**\n\nEs un bot de Discord 2022 para ver información y descargar animes clásicos, animes del momento, animes más populares, todo basado y extraido de AnimeFLV. \nActualmente contiene 10 comandos:`)
                embed.addField(`☆ ${emote}`, cmds.map(c => `*${c.conf.description}* \n ( Aliases: ${(c.conf.aliases).join("; ")} )`).join(" "));
            });
            embed.setImage('https://latarde.com/wp-content/uploads/2021/04/alternativas-a-AnimeFLV.jpg');
            embed.setTimestamp();

            return interaction.reply({embeds: [embed], components:[detallesurl]});
    
}
module.exports.conf = {
    "name": "help",
    "description": "Ve información detallada del Bot y sus comandos",
    "options":[],
    "category": "info"
}