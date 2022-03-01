const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { AnimeWallpaper } = require("anime-wallpapers");
const wall = new AnimeWallpaper();
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args, prefix) => {
    const wallpaper = await wall.getAnimeWall3()
    const detallesurlmsg = new MessageActionRow().addComponents(
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
            .setAuthor({name: `${message.guild.me.displayName}`, iconURL: message.guild.iconURL()})
            .setThumbnail(client.user.displayAvatarURL());
            let commandNames = [];
            client.commands.forEach(c => {
                commandNames.push(c.conf.name);
            })

            commandNames.forEach(comandos => {
                let cmds = client.commands.filter(c => (c.conf.category === "info") && (c.conf.name === (comandos)));
                embed.addField(`☆ ${comandos}`, cmds.map(c => `*${c.conf.description}* \n ( Aliases: ${(c.conf.aliases).join("; ")} )`).join(" "));
                embed.setDescription(`**El prefijo actual es \`${prefix}\`**\n\nEs un bot de Discord 2022 para ver información y descargar animes clásicos, animes del momento, animes más populares, todo basado y extraido de AnimeFLV. \nActualmente contiene 14 comandos:`);
            });
            embed.setImage(wallpaper[0].image);
            embed.setFooter({text: "Imagen: "+wallpaper[0].title})
            embed.setTimestamp();

            return message.reply({embeds: [embed], components:[detallesurlmsg]});
}
module.exports.conf = {
    "name": "help",
    "description": [ "Ve información del bot y los comandos." ],
    "aliases": ["pong", "latencia"],
    "usage": ["latencia"],
    "category": "info"
}
