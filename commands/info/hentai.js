const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { captureRejections } = require("events");
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = (client, message, args) => {
    const link = new MessageActionRow().addComponents(
        new MessageButton()
        .setURL('https://hentaila.com/')
        .setLabel("Ir a la página")
        .setStyle('LINK')
    );
    message.reply({
        embeds: [
            new MessageEmbed()
            .setDescription('📸 Tomando foto...')
            .setColor("RANDOM")
        ]}).then(msg =>{
        msg.edit({
            embeds: [
                new MessageEmbed()
                .setDescription('**Hentaila contiene contenido NSFW** \n\nCopia y pega esta url: \n``` https://hentaila.com/ ``` \no dale click al botón:')
                .setColor('#ff50b6')
                .setThumbnail("https://pbs.twimg.com/profile_images/1216274611316326400/9SrIoC8o_400x400.png")
                .setAuthor({name: "Hentaila.com", iconURL:"https://userstyles.org/style_screenshot_thumbnails/189335_after.jpeg?r=1636531279", url: "https://hentaila.com/"})
                .setFooter({text: `Nota: Página para mayores de 18 años 🔞`})
            ], components:[link]})
    })
}
module.exports.conf = {
    "name": "hentai",
    "description": [ "(+18) Te redirecciona a una página de hentai" ],
    "aliases": ["hentalia"],
    "usage": ["hentai"],
    "category": "info"
}
