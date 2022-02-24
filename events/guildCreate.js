const { Collection } = require('discord.js');
const { commandRefresh } = require('../utils/commandRefresh');
const db = require('quick.db');

module.exports = async(guild) => {
    console.log("Nuevo servidor: ", guild.name)
    const listedChannels = []; 
    guild.channels.cache.forEach(channel => { 
    if(channel.permissionsFor(guild.me).has('VIEW_CHANNEL') && channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.type == 'GUILD_TEXT') listedChannels.push(channel.id);
    });
    const wcanal = listedChannels[0];
    guild.channels.cache.get(wcanal).send(`**¡Gracias por usar AnimeFLV] Bot!** Para saber como ver información y descargar animes clásicos, actuales y populares, escribe: \n\`/help\` o \`flvhelp\` \npara obtener una lista de los comandos que puedes usar. \n*La página oficial de animes es* https://www3.animeflv.net `).then(msg => {
        setTimeout(() => msg.delete(), 60000)
      });
    
    let client = guild.client
    let cmds = []
    client.slash.each(prob => {
        cmds.push({ name: prob.conf.name, description: prob.conf.description, options: prob.conf.options })
        cmds
    })
    commandRefresh(guild.id, cmds)
}
