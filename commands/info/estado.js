const { Client, Message, MessageEmbed, Permissions, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { captureRejections } = require("events");
const { version, author } = require('../../package.json');
const moment = require('moment-timezone');
const { release, cpus } = require('os');
/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports.run = async(client, message, args) => {
  const { heapUsed, heapTotal } = process.memoryUsage();

  return message.channel.send({
    embeds: [
    new MessageEmbed()
    .setColor('#e09c2c')
    .setURL('https://www3.animeflv.net')
    .setTitle(`${client.user.username} v${version}`)
    .addFields([
      {value:'━━━━━━━━━━━━━━━━━━━━━━━━━━━━',name:`Ayudando a ${client.guilds.cache.size} servidores`},{
        name: '👥\u2000USERS', value: [
          `Total:\u2000\u2000**${client.guilds.cache.reduce((acc, cur) => acc + cur.memberCount, 0)}**`,
          `Cached:\u2000\u2000**${client.users.cache.size}**`,
          `Here:\u2000\u2000**${message.guild.memberCount}**`
        ].join('\n'), inline: true,
      },{
        name: '🧠\u2000MEMORY', value: [
          `Total (*heap*):\u2000\u2000[**\` ${(heapTotal / 1024 / 1024).toFixed(0)} MB \`**]`,
          `Used (*heap*):\u2000\u2000[**\` ${(heapUsed / 1024 / 1024).toFixed(0)} MB \`**]`
        ].join('\n'), inline: true,
      },{value:'━━━━━━━━━━━━━━━━━━━━━━━━━━━━',name:'\u200b'},{
        name: '⚙️\u2000SYSTEM', value: [
          `OS:\u2000\u2000**${process.platform} ${release}**`,
          `DiscordJS:\u2000\u2000**v13.0.1**`,
          `Node:\u2000\u2000**${process.version}**`,
          `CPU:\u2000\u2000**${cpus()[0].model}**`,
        ].join('\n'),
      }
    ]).setFooter({text: `Estado del bot `})]}
  );
}
module.exports.conf = {
    "name": "estado",
    "description": [ "Muestra el ping del bot." ],
    "aliases": ["stats", "status"],
    "usage": ["latencia"],
    "category": "info"
}