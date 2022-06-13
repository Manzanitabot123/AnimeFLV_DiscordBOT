const Discord = require('discord.js');

module.exports = async(guild) => {
    console.log("[NUEVO SERVIDOR] ", guild.name)
    const listedChannels = []; 
    guild.channels.cache.forEach(channel => { 
    if(channel.permissionsFor(guild.me).has('VIEW_CHANNEL') && channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.type == 'GUILD_TEXT') listedChannels.push(channel.id);
    });
    const wcanal = listedChannels[0];
	const fetch = require('node-fetch');
	const Smile = await fetch('https://nekos.best/api/v2/smile')
    	.then(res => res.json());
	const gracias = new Discord.MessageEmbed()
		.setAuthor({name: `¡Gracias por usar AnimeFLV Bot!`, iconURL: guild.iconURL()})
		.setDescription(`Para saber como ver información y descargar animes clásicos, actuales y populares, escribe: \n\`/help\`. \nDe esta manera, también, obtendrás una lista de los comandos que puedes usar. \n*La página oficial de animes es https://www3.animeflv.net *`)
		.setColor(textoyemojis.embedColor)
		.setImage(`${Smile.results[0].url}`)
        .setFooter({text: `Anime: ${Smile.results[0].anime_name} - nekos.best API`})
		.setTimestamp();
	const buttonsthx = new Discord.MessageActionRow()
		.addComponents(new Discord.MessageButton()
		.setURL('https://www.animeflv.net/')
		.setEmoji(`${textoyemojis.emojis.animeflv_icon}`)
		.setStyle('LINK'))
	guild.channels.cache.get(wcanal).send({ embeds: [gracias], components: [buttonsthx]});
}
