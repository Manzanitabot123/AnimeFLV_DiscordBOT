const { Client, Interaction, MessageEmbed, Permissions, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { version, author } = require('../../package.json');
const { release, cpus } = require('os');
const db = require('quick.db');

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports.run = (client, interaction, prefix) => {
    const { heapUsed, heapTotal } = process.memoryUsage();
    const mensaje = db.get(`estadoanimeflv.${client.user.id}`)

    interaction.reply({
    embeds: [
    new MessageEmbed()
    .setColor('#e09c2c')
    .setURL('https://www3.animeflv.net')
    .setTitle(`${client.user.username} v${version}`)
    .addFields([
      {value:'━━━━━━━━━━━━━━━━━━━━━━━━━━━━',name:`Ayudando a ${client.guilds.cache.size} servidores`},{
        name: '👥\u2000USUARIOS', value: [
          `Total:\u2000\u2000**${client.guilds.cache.reduce((acc, cur) => acc + cur.memberCount, 0)}**`,
          `En cache:\u2000\u2000**${client.users.cache.size}**`,
          `Aquí:\u2000\u2000**${interaction.guild.memberCount}**`
        ].join('\n'), inline: true,
      },{
        name: '🧠\u2000MEMORIA', value: [
          `Total :\u2000\u2000[**\` ${(heapTotal / 1024 / 1024).toFixed(0)} MB \`**]`,
          `Usado:\u2000\u2000[**\` ${(heapUsed / 1024 / 1024).toFixed(0)} MB \`**]`
        ].join('\n'), inline: true,
      },{value:'━━━━━━━━━━━━━━━━━━━━━━━━━━━━',name:'\u200b'},{
        name: '⚙️\u2000SISTEMA', value: [
          `OS:\u2000\u2000**${process.platform} ${release}**`,
          `DiscordJS:\u2000\u2000**v13.0.1**`,
          `Node:\u2000\u2000**${process.version}**`,
          `CPU:\u2000\u2000**${cpus()[0].model}**`,
        ].join('\n'),
      },{value:'━━━━━━━━━━━━━━━━━━━━━━━━━━━━',name:'\u200b'},{
        name: '⚡\u2000FUNCIONAMIENTO DEL BOT Y LA WEB', value:  `${mensaje}`,
      }
    ]).setFooter({text: `Estado del bot `})]}
  );
}
module.exports.conf = {
    "name": "estado",
    "description": "Muestra el estado actual del bot",
    "options": [],
    "category": "info"
}