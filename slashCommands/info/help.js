const { Client, Interaction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require('quick.db');
require("dotenv").config();
const defprefix = process.env.PREFIX;
const { AnimeWallpaper } = require("anime-wallpapers");
const wall = new AnimeWallpaper();
/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports.run =  async(client,interaction) => {
    const wallpaperslash = await wall.getAnimeWall3()
    const detallesurl = new MessageActionRow().addComponents(
        new MessageButton()
        .setURL('https://www.animeflv.net/')
        .setEmoji(`${textoyemojis.emojis.animeflv_icon}`)
        .setStyle('LINK'),
        new MessageButton()
        .setURL('https://www.facebook.com/groups/armyanime')
        .setEmoji(`${textoyemojis.emojis.facebook_icon}`)
        .setStyle('LINK'),
        new MessageButton()
        .setURL('https://twitter.com/ArmyAnime_')
        .setEmoji(`${textoyemojis.emojis.twitter_icon}`)
        .setStyle('LINK'),
        new MessageButton()
        .setURL('https://www.instagram.com/animearmy.jp/')
        .setEmoji(`${textoyemojis.emojis.instagram_icon}`)
        .setStyle('LINK'),
        new MessageButton()
        .setURL('https://www.youtube.com/c/kudasai')
        .setEmoji(`${textoyemojis.emojis.youtube_icon}`)
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
                embed.setDescription(`**El prefijo actual es \`${fprefix}\`**\n\nEs un bot de Discord 2022 para ver información y descargar animes clásicos, animes del momento, animes más populares, todo basado y extraido de AnimeFLV. \nActualmente contiene 14 comandos:`)
                embed.addField(`☆ ${emote}`, cmds.map(c => `*${c.conf.description}* \n ( Aliases: ${(c.conf.aliases).join("; ")} )`).join(" "));
            });
            embed.setImage(wallpaperslash[0].image);
            embed.setFooter({text: "Imagen: "+wallpaperslash[0].title})
            embed.setTimestamp();

            return interaction.reply({embeds: [embed], components:[detallesurl]});
    
}
module.exports.conf = {
    "name": "help",
    "description": "Ve información detallada del Bot y sus comandos",
    "options":[],
    "category": "info"
}